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
  const { token } = useAuth()
  const location = useLocation()

  if (!token) {
    return <Navigate to={"/login"} replace state={{ from: location }} />
  }

  return (
    <div className="container">
      <Header />
      <Navigation />
      <Modal />
      {children}
    </div>
  )
}
