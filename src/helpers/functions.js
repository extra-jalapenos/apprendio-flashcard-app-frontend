import { baseURL, headers } from "./constants"
import { timeToNextPracticeObj } from "./constants"

export const makeHeaders = (method = "GET") => {
  const headers = new Headers()
  headers.set("method", method)
  headers.set("content-type", "application/json")
  const token = sessionStorage.getItem("token")
  if (token) {
    headers.set("Authorization", "Bearer " + token)
  }
  return headers
}

export const getEntries = () => {
  const endpoint = "/entries/"

  const options = {
    headers: headers
  }

  fetch(baseURL + endpoint, options)
    .then(response => response.json())
}

export const deleteEntry = (id) => {
  const endpoint = "/entries/" + id

  const options = {
    method: "DELETE",
    headers: headers
  }

  fetch(baseURL + endpoint, options)
    .then(response => response.json())
    .catch(error => console.log("error deleting entry, id:", id, error))
}


export const getCategories = () => {
  const endpoint = "/categories/"

  const options = {
    headers: headers
  }

  fetch(baseURL + endpoint, options)
    .then(response => response.json())
}

export const deleteCategory = (id) => {
  const endpoint = "/categories/" + id

  const options = {
    method: "DELETE",
    headers: headers
  }

  fetch(baseURL + endpoint, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log("error deleting entry, id:", id, error))
}

export const readyForPractice = (card) => {
  if (!card.lastAsked) return true
  const last = new Date(card.lastAsked)
  const timeDiff = new Date() - last
  const timeDiffObj = timeToNextPracticeObj()
  const minTimeDiff = timeDiffObj[card.level]
  return timeDiff >= minTimeDiff
}
