import { useEffect, useState } from "react"
import * as XLSX from "xlsx";
import BatchImportReview from "./BatchImportReview";

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

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!file) return

    const filetype = () => {
      const fileTypeDotPosition = file.name.lastIndexOf(".")
      console.log(fileTypeDotPosition, file.name)
      return file.name.slice(fileTypeDotPosition)
    }

    const type = filetype()
    console.log(type)

    const processCSV = () => {
      console.log("csv processing", data)

      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e.target)
        const fileContents = e.target.result;
        const dataArray = fileContents.split("\n");
        setData(dataArray);
        console.log(dataArray)
      };
      reader.readAsText(file);
    }

    const processXLSX = () => {
      console.log("xlsx processing", data)
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
    }
    
    // CSV
    if (type === ".csv") processCSV(event)

    // XLSX
    if (type === ".xlsx") processXLSX(event)

    }

  return (
    <>
      <main className="center">
      <h2>Batch create entries</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="text/csv,.xlsx" onInput={handleInput}/>
        <button>Start import</button>
      </form>
      {!data && <>
          <h3>Don't know how to start?</h3>
          <DownloadButton url={"./src/assets/ImportTemplate.xlsx"} text="Download template"/>
        </>
      }

      {!!data && <BatchImportReview data={data} type={"xlsx"} />}
      </main>
    </>
  )
}