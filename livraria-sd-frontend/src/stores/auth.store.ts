import { create } from "zustand";
import { Session, UserData } from "./types/core.types";
import { api } from "@/services/api";

interface AuthStore {
  session: Session;
  authenticate: () => Promise<void>;
}

const noneSession: Session = {
  isLoading: true,  
  auth: false,
  id: "",
  name: "",
  email: "",
};

const useAuthStore = create<AuthStore>((set, state) => ({
  session: noneSession,
  authenticate: async () => {
    try {
      const response = await api.get("/auth");
      if (response.status === 200) {
        set({
          session: {
            isLoading: false,
            auth: true,
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
          },
        });
      }
    } catch (error) {
      console.warn("Usuário não autenticado");
    }
  },
}));

export default useAuthStore;
