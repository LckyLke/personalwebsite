import { create } from "zustand";
import { persist } from "zustand/middleware";

let userStore = (set) => ({
  user: "",
  ratings: [],
  setUserName: (user) => set({ user }),
  setUserRatings: (ratings) => set({ ratings }),

  selectedAmount: 10,
  setSelectedAmount: (value) => set({ selectedAmount: value }),
});

let cardStore = (set) => ({
  cards: [],
  setCards: (cards) => set({ cards }),
});

userStore = persist(userStore, { name: "userStore" });

export const useCardStore = create(cardStore);
export const useUserStore = create(userStore);
