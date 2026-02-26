import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({ 
    name: "" as string,
  }),

  actions: {
    setName(user: any) {
      this.name = user.name;
    },
  },
});