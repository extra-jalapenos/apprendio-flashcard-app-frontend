function Row ({rowArr}) {
  return(
    <li className="list-entry reviewData" >
      {rowArr.map((cell, index) => <p key={index}>{cell}</p>)}
    </li>
  )
}

export default function BatchImportReview ({data}) {
  return (
    <>
      <h2>Review your data</h2>
      <div className="list">
        {data.map((row, index) => <Row key={index} rowArr={row}/>)}
      </div>
    </>
  )
}
