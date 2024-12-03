"use client";
import BookCard from "@/components/ui/book-card.component";
import useAuthStore from "@/stores/auth.store";
import useBookStore from "@/stores/book.store";
import { BookXIcon } from "lucide-react";
import { div } from "motion/react-client";
import { useEffect } from "react";

export default function MyBooks() {
  const session = useAuthStore((state) => state.session);
  const bookStore = useBookStore((state) => state);

  useEffect(() => {
    if (!session.isLoading) {
      bookStore.getMyBooks(session.email);
    }
  }, [session.isLoading]);

  console.log(bookStore.myBooks)

  return (
    <section className="w-full flex justify-center">
      <main className="max-w-8xl min-h-screen flex flex-col space-y-20 my-10 py-10">
        <h1 className="font-bold text-3xl">Meus Livros</h1>
        <div className="flex flex-wrap gap-10">
          {bookStore.myBooks.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      </main>
    </section>
  );
}
