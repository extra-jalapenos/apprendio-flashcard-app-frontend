import "../login/style.css"

export default function Loading ({message}) {
  if (!message) {
    return (
      <div className="center">
        <h3>Loading…</h3>
        <p>This might take a while.</p>
      </div>
    )
  }
  return (
    <div className="center">
      <h3>{message}</h3>
      <p>This might take a while.</p>
    </div>
  )
}
