export default function InputField ({handleEntry}) {
  return (
    <textarea onChange={handleEntry} placeholder="Type your answer here…">
    </textarea>
  )
}