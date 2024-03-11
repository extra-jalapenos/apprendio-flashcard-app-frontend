import { useContext, useState } from "react"
import { headers } from "../../helpers/constants"
import { useNavigate } from "react-router"
import { userContext } from "../../context"
import Form from "./Form"

export default function Register () {

  const { setUser } = useContext(userContext)

  const navigate = useNavigate()
  const [signupData, setSignupData] = useState(null)

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
        console.log("username taken")
      } else {
        console.log("something went wrong registering")
      }
    } catch (error) {
      console.log(error, "something went wrong during signup")
    }
    event.target.reset()
  }

  return (
    <div className="center">
      <div className="banner">
        <p><b>Important note</b></p>
        <p>Due to the app still being under development, we can&apos;t yet accept new users. Thank you for your patience. ♥️</p>

        <p className="fineprint"><b>But why? It <em>is</em> on the internet, isn&apos;t it?</b></p>
        <p className="fineprint">The main issue is that the backend is not yet connected. The best way to explain what this means is to think of this site as somebody that&apos;s very pretty and knows how to do a lot of cool, amazing things, but has no long-term memory (and no idea about how inappropriate it would be to show your cards to everybody else).</p>
      </div>
      <h2>Hi, so nice to meet you!</h2>
      <p>Create your account and start right away!</p>
      <Form name="signup" handleInput={handleInput} handleSubmit={handleSubmit}/>
    </div>
  )
}
