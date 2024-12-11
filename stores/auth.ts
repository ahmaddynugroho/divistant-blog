import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    loggedIn: false,
    user: ''
  }),
  actions: {
    login(username: string, password: string) {
      if (username === 'admin' && password === 'admin123') {
        this.loggedIn = true
        this.user = 'Admin'
        return { success: true }
      }
      return { success: false }
    },
    logout() {
      this.loggedIn = false
      this.user = ''
    }
  }
})
