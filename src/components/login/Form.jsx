import "./style.css"

export default function Form ({ prefill, handleSubmit, handleInput }) {
  const username = prefill.username || ""
  const password = prefill.password || ""
  return (
    <form className="form" onChange={handleInput} onSubmit={handleSubmit}>
      <p className="formfield-label required">username</p>
      <input className="formfield" name="username" autoComplete="username" defaultValue={username}/>
      <p className="formfield-label required">password</p>
      <input className="formfield" name="password" type="password" autoComplete="password" defaultValue={password} />
      <button value={"Submit"}>Enter</button>
    </form>
  )
}
