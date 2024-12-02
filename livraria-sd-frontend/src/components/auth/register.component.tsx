"use client"
import Input from "../ui/input.componenet";
import { XIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/services/api";
import useAuthStore from "@/stores/auth.store";

export default function Register({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const session = useAuthStore((state) => state.session);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const performRegister = async () => {
    api.post("/auth/register", data).then((res) => {
        session.auth = true;
        session.id = res.data.id;
        session.name = res.data.name;
        session.email = res.data.email;
    })
    setData({ username: "", email: "", password: "" })
    console.log(session)
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
              <h1 className="text-xl text-center font-bold">Crie uma conta</h1>
              <XIcon
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <Input
              onChange={(e) => setData({ ...data, username: e.target.value })}
              value={data.username}
              label="Nome"
            />
            <Input
              onChange={(e) => setData({ ...data, email: e.target.value })}
              value={data.email}
              type="email"
              label="Email"
            />
            <Input
              onChange={(e) => setData({ ...data, password: e.target.value })}
              value={data.password}
              type="password"
              label="Senha"
            />

            <button onClick={performRegister} className="bg-darkColor mt-3 py-2 text-white rounded-lg">
              Criar conta
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
