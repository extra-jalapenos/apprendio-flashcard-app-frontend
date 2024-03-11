import { createContext } from "react"

export const userContext = createContext()
export const sessionContext = createContext()
export const practiceContext = createContext()

export const initSession = {
  "correct": 0,
  "wrong": 0
}
