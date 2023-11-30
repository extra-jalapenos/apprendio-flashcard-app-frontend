import { baseURL, headers } from "./constants"


export const getEntries = async () => {
  const endpoint = "/entries/"

  const options = {
    headers: headers
  }

  return await fetch(baseURL + endpoint, options)
}

export const deleteEntry = (id) => {
  const endpoint = "/entries/" + id

  const options = {
    method: "DELETE",
    headers: headers
  }

  fetch(baseURL + endpoint, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log("error deleting entry, id:", id, error))
}

export const deleteCategory = (id) => {
  const endpoint = "/category/" + id

  const options = {
    method: "DELETE",
    headers: headers
  }

  fetch(baseURL + endpoint, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log("error deleting entry, id:", id, error))
}