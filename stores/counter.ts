import { defineStore } from "pinia"

export const useCounterStore = defineStore("counterStore", {
  state: () => ({
    count: 1,
  }),
  actions: {
    increment() {
      this.count += 2
    }
  }
})
