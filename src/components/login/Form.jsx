export default function Form ({ handleSubmit, handleInput }) {
  return (
    <form onSubmit={handleSubmit}>
      <label>Username</label>
      <input name="username" onChange={handleInput} autoComplete="username"/>
      <label>Password</label>
      <input name="password" type="password" onChange={handleInput} autoComplete="password"/>
      <button value={"Submit"}>Submit</button>
    </form>
  )
}
