'use client'

import { getUserLogin } from "@/util/apiUser"
import { createContext, useState } from "react"

export const UserContext = createContext()

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [firstLogin, setFirstLogin] = useState(false);

  function login(data) {
    setUser(data)
  }

  function logout() {
    setUser(null)
  }

  function autoLogin() {
    if (!firstLogin) {
      const remember = (localStorage.getItem('rememberMe') === 'true')

      if (!remember)
        return

      const email = localStorage.getItem('rememberedEmail')
      const password = localStorage.getItem('rememberedPassword')

      getUserLogin(email, password).then((response) => {

        if (response && response.id) {
          login(response)
          console.log('Login successful:', { email, password });
        }
        else {
          console.log('Erro no login:', response);
        }
      })
    }
  }

  return (
    <UserContext.Provider value={{ user, login, logout, autoLogin, firstLogin, setFirstLogin }}>
      {children}
    </UserContext.Provider>
  )
}