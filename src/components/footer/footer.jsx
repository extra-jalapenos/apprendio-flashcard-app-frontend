import { useContext } from "react";
import Statistics from "./Statistics"
import { sessionContext } from "../../App"

export default function Footer () {
  const {sessionStats} = useContext(sessionContext)
  console.log(sessionStats, "in Footer")
  return (
    <footer>
      <Statistics />
    </footer>
  )
}