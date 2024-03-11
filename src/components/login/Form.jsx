export default function Form ({ handleSubmit, handleInput }) {
  return (
    <div className="autoColumns">
      <form onSubmit={handleSubmit}>
        <span className="required">Username</span>
        <input name="username" onChange={handleInput} autoComplete="username"/>
        <span className="required">Password</span>
        <input name="password" type="password" onChange={handleInput} autoComplete="password"/>
        <button value={"Submit"}>Submit</button>
      </form>
    </div>
  )
}
