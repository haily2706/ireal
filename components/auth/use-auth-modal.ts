import { create } from "zustand";

type AuthView = "sign_in" | "sign_up" | "magic_link" | "forgotten_password" | "update_password" | "verify_otp";

interface AuthModalStore {
    isOpen: boolean;
    view: AuthView;
    onOpen: (view?: AuthView) => void;
    onClose: () => void;
}

export const useAuthModal = create<AuthModalStore>((set) => ({
    isOpen: false,
    view: "sign_in",
    onOpen: (view = "sign_in") => set({ isOpen: true, view }),
    onClose: () => set({ isOpen: false }),
}));
