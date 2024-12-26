import "../login/style.css"

export default function Loading ({message}) {
  if (!message) {
    return (
      <div className="center">
        <h2>Loading…</h2>
        <p>This might take a while.</p>
      </div>
    )
  }
  return (
    <div className="center">
      <h2>{message}</h2>
      <p>This might take a while.</p>
    </div>
  )
}
