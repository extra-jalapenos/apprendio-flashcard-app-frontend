import { useNavigate } from "react-router-dom"
import "./style.css"

export default function Home() {
  const navigate = useNavigate()
  return(
    <>
      <div className="center">
        <p className="quote">
          <p>And then I thought to myself – <em>How hard can it be, really. Toddlers have learnt this language</em>.</p>
        </p>
      </div>
      <p>Learning anything can be tedious and hard. Especially when learning vocabulary for a new language or chemistry equations, flashcards are effective but time-consuming to write and not really made to be taken on the road (just think of the busdriver jamming the brakes!).</p>
      <p>We&apos;ve made this site to be able to study when you want, how much you want. We&apos;ll handle the shuffling of cards and quizzing you – we&apos;ll also put them away if you&apos;ve learnt them, promise.</p>
      <p>The only thing you have to do is to keep coming back.</p>
      <div className="center">
        <button onClick={() => navigate("/register")}>Start now!</button>
      </div>
    </>
  )
}


