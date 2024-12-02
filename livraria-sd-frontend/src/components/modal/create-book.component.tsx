import { Dispatch, SetStateAction, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react";
import Input from "../ui/input.componenet";
import useAuthStore from "@/stores/auth.store";
import useBookStore from "@/stores/book.store";
import { CreateBookDto } from "@/stores/types/core.types";

export default function CreateBook({
    isOpen,
    setOpen,
  }: {
    isOpen: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  }) {
    const session = useAuthStore((state) => state.session);
    const addBook = useBookStore((state) => state.addBook);
    const [data, setData] = useState({
      name: "",
      author: "",
      price: ""
    });

    const createBook = async () => {
        const book: CreateBookDto = {
            name: data.name,
            author: data.author,
            price: data.price,
            email: session.email
        }
        addBook(book)
        setOpen(false)
        setData({
            name: "",
            author: "",
            price: ""
        })
    }
  
    return (
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="fixed flex justify-center items-center inset-0 z-40 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="rounded-lg shadow-md shadow-black/40 flex flex-col py-7 px-5 justify-center bg-lightColor max-w-md w-full">
              <div className="flex justify-between items-center">
                <h1 className="text-xl text-center font-bold">Vender livro</h1>
                <XIcon
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <Input
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                label="Título"
              />
              <Input
                value={data.author}
                onChange={(e) => setData({ ...data, author: e.target.value })}
                label="Autor"
              />
              <Input
                value={data.price}
                onChange={(e) => setData({ ...data, price: e.target.value })}
                label="Preço"
              />
              <button onClick={createBook} className="bg-darkColor mt-3 py-2 text-white rounded-lg">
                Criar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
  