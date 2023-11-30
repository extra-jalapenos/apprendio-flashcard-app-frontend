import { useState } from "react"
import * as XLSX from "xlsx";

const DownloadButton = ({url, text}) => {
  const downloadFile = () => window.location.href = {url}
  return (
    <button onClick={downloadFile}>{text}</button>
  )
}

export default function BatchImport () {
  const [file, setFile] = useState(null)
  const [data, setData] = useState(null)

  const handleInput = (event) => setFile(event.target.files[0])

  // CSV
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!file) return

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContents = e.target.result;
      const dataArray = fileContents.split("\n");
      setData(dataArray);
    };

    reader.readAsText(file);
  }

  // XLSX
  const handleSubmitXLSX = (event) => {
    event.preventDefault();
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContents = e.target.result;
      const workbook = XLSX.read(fileContents, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const dataArray = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setData(dataArray);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <>
      <main className="center">
      <h2>Batch create entries</h2>
      <form onSubmit={handleSubmitXLSX}>
        <input type="file" accept="text/csv *.xlsx" onInput={handleInput}/>
        <button>Start import</button>
      </form>
      <h3>Don't know how to start?</h3>
      <DownloadButton url={"./src/assets/ImportTemplate.xlsx"} text="Download template"/>
      </main>
    </>
  )
}