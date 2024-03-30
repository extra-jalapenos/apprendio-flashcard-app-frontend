import NotFound from "../components/notfound/NotFound"

export const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token")

  if (!token) {
    return <NotFound />
  }

  return (
    children
  )
}
