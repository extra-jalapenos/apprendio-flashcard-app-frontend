import { useNavigate } from "react-router-dom"
import "./style.css"

export default function Home() {
  const navigate = useNavigate()
  return(
    <>
      {/* <div className="center">
        <p className="quote">
          <p>And then I thought to myself – <em>How hard can it be, really. Toddlers have learnt this language</em>.</p>
        </p>
      </div> */}
      <div className="center">
        <p className="quote">
          <p>Flashcards are still on parchment paper? That&apos;s totally <em>barbaric</em>!</p>
          <p className="source">Hermione Granger, probably</p>
        </p>
      </div>
      <h2>Flashcards, but in 2024</h2>
      <p>Learning anything can be tedious and hard. Especially when learning vocabulary for a new language or all diagnostic codes for diseases according to the <a href="https://en.wikipedia.org/wiki/ICD-10" target="blank">ICD</a>, flashcards are effective but time-consuming to write and not really made to be taken on the road (just think of the busdriver jamming the brakes!).</p>
      <p>We&apos;ve made this site for you to be able to study when you want, how much you want. We&apos;ll handle the shuffling of cards and quizzing you – we&apos;ll also put them away if you&apos;ve learnt them, promise.</p>
      <p>The only thing you have to do is to keep coming back.</p>
      <div className="button-box">
        <button onClick={() => navigate("/register")}>Start learning</button>
        <button onClick={() => navigate("/login")}>Log in</button>
        <button onClick={() => navigate("/FAQ")}>Tell me more!</button>
      </div>
    </>
  )
}
