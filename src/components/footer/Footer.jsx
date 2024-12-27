import SessionStatistics from "./SessionStatistics"
import { userContext } from "../context/context"
import { useContext } from "react"

export default function Footer () {
  const { user } = useContext(userContext)

  if (!user) return

  return (
    <footer>
      <SessionStatistics />
    </footer>
  )
}
