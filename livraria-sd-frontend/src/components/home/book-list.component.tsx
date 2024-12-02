import useBookStore from "@/stores/book.store";
import { Book } from "@/stores/types/core.types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import BookCard from "../ui/book-card.component";

export default function BookList() {
  const books = useBookStore((state) => state.books);
  return (
    <section className="w-full flex justify-center">
      <main className="max-w-8xl flex flex-col justify-center space-y-20 my-20 py-20">
        <h1 className="font-bold text-3xl">Nossos Livros</h1>
        <div className="flex flex-wrap gap-10">
          {books.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      </main>
    </section>
  );
}
