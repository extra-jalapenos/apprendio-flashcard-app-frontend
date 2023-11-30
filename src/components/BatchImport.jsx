import { useState } from "react"
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";


const DownloadButton = ({url, text}) => {
  const navigate = useNavigate()
  const downloadFile = () => {
    // window.location.href = navigate("/src/assets/ImportTemplate.xlsx")
    window.location.href = {url}
  }

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
      console.log(dataArray)
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
      const sheetName = workbook.SheetNames[0]; // Assuming you're interested in the first sheet
      const sheet = workbook.Sheets[sheetName];
      console.log(sheetName, sheet)
      const dataArray = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setData(dataArray);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <>
      <h2>Batch create entries</h2>
      <main>
        <div className="center twoColumns">
          <p>Don't know how to start?</p>
          {/* <p className="buttoncontainer"> */}
            <DownloadButton url={"./src/assets/ImportTemplate.xlsx"} text="Download template"/>
          {/* </p> */}
        </div>
      <form onSubmit={handleSubmitXLSX}>
        <input type="file" accept="text/csv *.xlsx" onInput={handleInput}/>
        <button>Start import</button>
      </form>
      </main>
    </>
  )
}