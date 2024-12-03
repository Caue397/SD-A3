import useBookStore from "@/stores/book.store";
import { MyBook } from "@/stores/types/core.types";
import { BookMinus, ShoppingCart } from "lucide-react";

export default function MyBookCard({ book }: { book: MyBook }) {
    const deleteBook = useBookStore((state) => state.deleteBook)

    return (
      <div className="w-72 p-5 hover:scale-105 transition-all duration-300 shadow-md rounded-lg space-y-2">
        <div 
          className="w-full h-80 bg-lightColor/50 rounded-lg"
        />
        <div>
          <h1 className="text-lg font-semibold">{book.name}</h1>
          <h3 className="text-xs text-neutral-500">Autor: {book.author}</h3>
        </div>
        <h3 className="font-bold">R$ {book.price}</h3>
        <button onClick={() => deleteBook(book.id)} className="flex items-center gap-2 px-5 py-2 rounded-lg bg-darkColor text-white">
          <BookMinus width={20} /> Excluir
        </button>
      </div>
    );
  }