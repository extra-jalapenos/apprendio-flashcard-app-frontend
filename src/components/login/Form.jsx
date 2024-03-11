import "./style.css"

export default function Form ({ handleSubmit, handleInput }) {
  return (
    <form className="form" onChange={handleInput} onSubmit={handleSubmit}>
      <div>
        <p className="formfield-label required">username</p>
        <input className="formfield" name="username" autoComplete="username" />
      </div>
      <div>
        <p className="formfield-label required">password</p>
        <input className="formfield" name="password" type="password" autoComplete="password" />
      </div>
      <button value={"Submit"}>Enter</button>
    </form>
  )
}
