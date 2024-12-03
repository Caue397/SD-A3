import Input from "../ui/input.componenet";
import { XIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/services/api";
import useAuthStore from "@/stores/auth.store";

export default function Login({
  isOpen,
  setOpen,
  setRegister,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setRegister: Dispatch<SetStateAction<boolean>>;
}) {
  const authenticate = useAuthStore((state) => state.authenticate);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<null | string>(null);

  const performLogin = async () => {
    try {
      await api.post("/auth/login", data);
      authenticate();
      setError(null);
      setOpen(false);
      setData({ email: "", password: "" });
    } catch (error) {
      setError("Email ou senha incorretos");
    }
  };

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
              <h1 className="text-xl text-center font-bold">Login</h1>
              <XIcon
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Input
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              label="Email"
              type="email"
            />
            <Input
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              type="password"
              label="Senha"
            />
            <span className="text-center my-4">
              Não tem uma conta?{" "}
              <button
                onClick={() => {
                  setRegister(true);
                  setOpen(false);
                }}
                className="underline"
              >
                Registre-se agora
              </button>
            </span>
            <button
              onClick={performLogin}
              className="bg-darkColor mt-3 py-2 text-white rounded-lg"
            >
              Entrar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
