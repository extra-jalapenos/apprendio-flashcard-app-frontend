export default function Searchbar ({handleInput}) {
  return (
    <form className="center">
      <input type="text" className="searchbar" placeholder="Search in cards" onChange={handleInput} />
    </form>
  )
}
