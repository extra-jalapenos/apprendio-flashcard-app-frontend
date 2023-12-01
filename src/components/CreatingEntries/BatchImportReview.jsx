function Row ({rowArr}) {
  return(
    <li className="fourColumns" >
      {rowArr.map((cell, index) => <p key={index}>{cell}</p>)}
    </li>
  )
}

export default function BatchImportReview ({data, type}) {

  console.log(data, type)
  return (
    <>
      <h3>Review your data</h3>
      <div className="list">
        {data.map((row, index) => <Row key={index} rowArr={row}/>)}
      </div>
    </>
  )
}