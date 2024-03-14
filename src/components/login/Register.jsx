import { useContext, useState } from "react"
import { headers } from "../../helpers/constants"
import { useNavigate } from "react-router"
import { userContext } from "../../context"
import Form from "./Form"
import { useSearchParams } from "react-router-dom";

export default function Register () {

  const { setUser } = useContext(userContext)
  let [searchParams, setSearchParams] = useSearchParams();
  const username = searchParams.get("username")

  const navigate = useNavigate()
  const [signupData, setSignupData] = useState({ username })
  const [failMessage, setFailMessage] = useState(null)

  const handleInput = (event) => {
    const { name, value } = event.target
    setSignupData({
      ...signupData,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(signupData)
    }

    try {
      const tryRegister = await fetch("/api/register", options)
      if (tryRegister.status === 201) {
        const data = await tryRegister.json()
        sessionStorage.setItem("token", data.token)
        setUser(signupData.username)
        navigate("/")
      } else if (tryRegister.status === 403) {
        setFailMessage(`Sorry, ${signupData.username} is already taken!`)
      } else {
        setFailMessage("Don't know about that. Did you fill out everything?")
      }
    } catch (error) {
      setFailMessage("Something went wrong. Our bad.")
    }
    event.target.reset()
  }

  return (
    <div className="center">
      <div className="banner warning">
        <p><b>Important note</b></p>
        <p>Due to the app still being under development, we can&apos;t yet accept new users. Thank you for your patience. ♥️</p>

        <p className="fineprint"><b>But why? It <em>is</em> on the internet, isn&apos;t it?</b></p>
        <p className="fineprint">The main issue is that the backend is not yet connected. The best way to explain what this means is to think of this site as somebody that&apos;s very pretty and knows how to do a lot of cool, amazing things, but has no long-term memory (and no idea about how inappropriate it would be to show your cards to everybody else).</p>
      </div>
      <h2>Hi, so nice to meet you!</h2>
      <p>Create your account and start right away!</p>
      {failMessage && <p className="banner warning center">{failMessage}</p>}
      <Form name="signup" prefill={signupData} handleInput={handleInput} handleSubmit={handleSubmit}/>
    </div>
  )
}
