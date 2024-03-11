export default function Searchbar ({handleInput}) {
  return (
    <form className="center">
      <label>Search entries for text</label>
      <input type="text" className="searchbar" placeholder="Search here…" onChange={handleInput} />
    </form>
  )
}