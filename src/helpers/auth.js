import { useNavigate, useLocation, Navigate } from "react-router-dom"

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
  const location = useLocation()
  console.log("heres the token", token)

  if (!token) {
    return <Navigate to={"/login"} replace state={{ from: location }} />
  }

  return (
    children
  )
}
