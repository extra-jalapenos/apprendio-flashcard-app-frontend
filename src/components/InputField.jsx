export default function InputField ({handleEntry, placeholder}) {
  return (
    <textarea onChange={handleEntry} placeholder={placeholder ? "Clue: " + placeholder : "Type your answer here…"}>
    </textarea>
  )
}