export default function SignupForm ({ prefill, handleSubmit, handleInput }) {
  const { username, email, password, repeatPassword } = prefill
  return (
    <form className="form" onChange={handleInput} onSubmit={handleSubmit}>
      <p className="formfield-label required">username</p>
      <input className="formfield" name="username" autoComplete="username" defaultValue={username}/>
      <p className="formfield-label required">e-mail</p>
      <input className="formfield" name="email" autoComplete="email" defaultValue={email}/>
      <p className="formfield-label required">password</p>
      <input className="formfield" name="password" type="password" autoComplete="password" defaultValue={password} />
      <p className="formfield-label required">repeat password</p>
      <input className="formfield" name="repeatPassword" type="password" autoComplete={repeatPassword} defaultValue={repeatPassword}/>
      <button value={"Submit"}>Enter</button>
    </form>
  )
}
