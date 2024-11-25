'use client'

import { createContext, useState } from "react"

export const UserContext = createContext()

export default function UserProvider({children}) {
  const [user, setUser] = useState(null)

  function login(data) {
    setUser(data)
  }

  function logout() {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}