export const makeHeaders = () => {
  const headers = new Headers()
  headers.set("content-type", "application/json")
  const token = sessionStorage.getItem("token")
  if (token) {
    headers.set("Authorization", "Bearer " + token)
  }
  return headers
}

export const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token")
  console.log("heres the token", token)

  if (!token) {
    return <>Not Found</>
  }

  return (
    children
  )
}
