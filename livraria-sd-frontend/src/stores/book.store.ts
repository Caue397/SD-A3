import { create } from "zustand";
import { Book, CreateBookDto, MyBook } from "./types/core.types";
import { api } from "@/services/api";

interface BookStore {
  books: Book[];
  myBooks: MyBook[];
  getBooks: () => Promise<void>;
  addBook: (book: CreateBookDto) => Promise<void>;
  getMyBooks: (email: string) => Promise<void>;
  deleteBook: (id: string) => Promise<void>;
}

const useBookStore = create<BookStore>((set, state) => ({
  books: [],
  myBooks: [],
  getBooks: async () => {
    const response = await api.get("/book");
    if (response.status === 200) {
      set({
        books: response.data,
      });
    }
  },
  addBook: async (book: CreateBookDto) => {
    const response = await api.post("/book", book);
    if (response.status === 200) {
      set({
        books: [...state().books, book],
      });
    }
  },
  getMyBooks: async (email: string) => {
    const response = await api.post(`/book/my`, { email });
    if (response.status === 200) {
      set({
        myBooks: response.data,
      });
    }
  },
  deleteBook: async (id: string) => {
    try {
      await api.delete(`/book/${id}`);
      set({
        myBooks: state().myBooks.filter((book) => book.id !== id),
      })
    } catch (error) {
      console.warn("Erro ao deletar livro");
    }
  }
}));

export default useBookStore;
