import { useContext } from "react";
import Statistics from "./Statistics"
import { sessionContext } from "../../App"

export default function Footer () {
  const {sessionStats} = useContext(sessionContext)
  return (
    <footer>
      <Statistics />
    </footer>
  )
}