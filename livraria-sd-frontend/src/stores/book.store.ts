import { create } from "zustand";
import { Book, CreateBookDto, MyBook } from "./types/core.types";
import { api } from "@/services/api";

interface BookStore {
  books: Book[];
  myBooks: MyBook[];
  getBooks: () => Promise<void>;
  addBook: (book: CreateBookDto) => Promise<void>;
  getMyBooks: (email: string) => Promise<void>;
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
    console.log(email)
    const response = await api.post(`/book/my`, { data: { email } });
    if (response.status === 200) {
      set({
        myBooks: [state().myBooks, response.data],
      });
    }
  },
}));

export default useBookStore;
