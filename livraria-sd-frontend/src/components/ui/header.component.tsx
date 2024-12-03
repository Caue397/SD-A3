"use client";
import { Book, LibraryBig, Search, ShoppingCart, UserIcon } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import Login from "../auth/login.component";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Register from "../auth/register.component";
import useAuthStore from "@/stores/auth.store";
import CreateBook from "../modal/create-book.component";
import Link from "next/link";

export default function Header() {
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [bookModal, setBookModal] = useState(false);
  const session = useAuthStore((state) => state.session);
  const authenticate = useAuthStore((state) => state.authenticate);

  useEffect(() => {
    authenticate();
  }, [])

  return (
    <header className="z-20 sticky top-0 flex justify-center h-28 text-darkColor w-full bg-lightColor">
      <main className="max-w-8xl w-full flex h-full justify-between items-center">
        <Link href={"/"} className={`text-2xl upper font-bold`}>Livraria.SD</Link>
        <nav className="flex items-center gap-10">
          <SearchBar />
          {session.auth ? (
            <>
              <MyBooks />
              <SellBook setOpen={setBookModal} />
              <UserCard name={session.name} email={session.email} />
            </>
          ) : (
            <LoginCard openLogin={setLoginModal} />
          )}
          <ShoppingCart width={32} height={32} />
        </nav>
      </main>
      <Login
        isOpen={loginModal}
        setOpen={setLoginModal}
        setRegister={setRegisterModal}
      />
      <Register isOpen={registerModal} setOpen={setRegisterModal} />
      <CreateBook isOpen={bookModal} setOpen={setBookModal} />
    </header>
  );
}

function SearchBar() {
  return (
    <div className="shadow-md shadow-black/20 px-3 rounded-lg py-2 gap-2 flex items-center text-darkColor bg-lightColor">
      <Search width={20} height={20} />
      <input
        placeholder="Procurar..."
        className="placeholder:text-sm outline-none bg-transparent"
        type="text"
      />
    </div>
  );
}

function MyBooks() {
  return (
    <Link href={"/my-books"} className="flex cursor-pointer items-center gap-2 hover:shadow-md shadow-black/70 rounded-lg px-3 py-2">
      <Book width={32} height={32} />
      <div className="text-xs">
        <h1>Meus</h1>
        <h1 className="font-bold">Livros</h1>
      </div>
    </Link>
  );
}

function SellBook({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  return (
    <div onClick={() => setOpen(true)} className="flex cursor-pointer items-center gap-2 hover:shadow-md shadow-black/70 rounded-lg px-3 py-2">
      <LibraryBig width={32} height={32} />
      <div className="text-xs">
        <h1>Vender</h1>
        <h1 className="font-bold">Meu livro</h1>
      </div>
    </div>
  );
}

function UserCard({ name, email }: { name: string; email: string }) {
  return (
    <div className="cursor-pointer hover:shadow-md shadow-black/70 rounded-lg px-3 py-2 flex items-center gap-2">
      <UserIcon width={32} height={32} />
      <div>
        <h1>{name}</h1>
        <h3 className="text-xs font-bold">{email}</h3>
      </div>
    </div>
  );
}

function LoginCard({
  openLogin,
}: {
  openLogin: Dispatch<SetStateAction<boolean>>;
}) {
  const session = useAuthStore((state) => state.session);
  return (
    <div
      onClick={() => openLogin(true)}
      className="cursor-pointer hover:shadow-md shadow-black/70 rounded-lg px-3 py-2 flex items-center gap-2"
    >
      <UserIcon width={32} height={32} />
      <div>
        <h1>Faça seu login</h1>
        <h3 className="text-xs font-bold">Seja bem-vindo!</h3>
      </div>
    </div>
  );
}
