import { useNavigate } from "react-router-dom"

export default function About() {
  const navigate = useNavigate()
  return (
    <div>
      <h2>Frequently Asked Questions</h2>
      <h3>What does Apprendio do?</h3>
      <p>This site was created to have a web-based app to practice flashcards either at home or on the go. If that sounds like something that you&apos;d like, you&apos;ve come to the right place!</p>
      <h3>How can I switch to your app?</h3>
      <p>Apprendio was originally created because our original learning app migrated from local installation to web-only, not supplying the option for importing a bunch of data. So <em>yes</em>, if you have your data in some structured format such as .xlsx or .csv, you will be able to import it. We also supply you with a template, if you&apos;re at a loss where to start.</p>
      <p>Sounds great? <a onClick={() => navigate("/register")}>Sign up here.</a></p>
      <h3>What if I want to use another app?</h3>
      <p>You are able to download your entire set of cards in either .csv format or .xlsx. We don&apos;t see the point in holding your data hostage just because we&apos;re not a great match for your learning journey.</p>
      <h3>Where is my data stored?</h3>
      <p>The database (essentially the memory of this app) and backend (the brain) is supplied by <a href="https://railway.app/">Railway</a>.</p>
      <h3>What does &quot;Apprendio&quot; mean?</h3>
      <p>It doesn&apos;t per se mean anything – it&apos;s borrowing the main word stem from the French <i>apprendre</i>, meaning <i>to learn</i>. We will tell business partners that the -io at the end stands for the very tech-y &quot;input output&quot; abbreviation, which seems apt for a web-based app, but just among us – we chose that to make it sound a bit like a magic spell, because that&apos;s how easy it should feel to learn with us!</p>
    </div>
  )
}
