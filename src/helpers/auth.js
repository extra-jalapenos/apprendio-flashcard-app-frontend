export const makeHeaders = () => {
  const headers = new Headers()
  headers.set("content-type", "application/json")
  const token = sessionStorage.getItem("token")
  if (token) {
    headers.set("Authorization", "Bearer " + token)
  }
  return headers
}

export const checkToken = async () => {
  const headers = makeHeaders()
  const options = {
    headers
  }

  try {
    const response = await fetch("/api/users/me/", options)
    const data = await response.json()
    return data
  } catch (error) {
    return { error }
  }
}
