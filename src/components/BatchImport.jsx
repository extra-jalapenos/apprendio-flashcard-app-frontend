import { useState } from "react"

export default function BatchImport () {
  const [file, setFile] = useState(null)
  const [data, setData] = useState(null)

  const handleInput = (event) => setFile(event.target.files[0])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!file) return

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContents = e.target.result;
      const dataArray = fileContents.split("\n");
      setData(dataArray);
      console.log(dataArray.length)
    };

    reader.readAsText(file);
  }

  return (
    <form onSubmit={handleSubmit}>
    <input type="file" accept="text/csv, image/jpeg" onInput={handleInput}/>
    <button>Start import</button>
    </form>
  )
}