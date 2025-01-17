import { baseURL, headers, timeToNextPracticeObj } from "./constants"
import { makeHeaders } from "./auth"


export const deleteEntry = async (id) => {
  const options = {
    method: "DELETE",
    headers: makeHeaders()
  }

  try {
    const response = await fetch(`/api/cards/${id}`, options)
    if (response.status === 204) {
      console.log("success deleting")
    } else {
      console.log("error deleting entry, id:", id)
    }
  } catch (error) {
    console.log("error deleting entry, id:", id, error)
  }
}

export const getCategory = async (categoryId) => {
  try {
    const options = {
      headers: makeHeaders()
    }
    const response = await fetch(`/api/categories/${categoryId}`, options)
    if (response.status === 200) {
      const data = await response.json()
      return data.category
    }
  } catch (error) {
    console.log("something went wrong fetching the category")
    return null
  }
}

export const getCategories = async () => {
  try {
    const options = {
      headers: makeHeaders()
    }
    const response = await fetch("/api/users/me/categories", options)
    if (response.status === 200) {
      const data = await response.json()
      return data.categories
    } else {
      return false
    }
  } catch (error) {
    console.log(error, "error fetching categories")
  }
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
  if (!card.lastAskedAt) return true
  const last = new Date(card.lastAskedAt)
  const timeDiff = new Date() - last
  const timeDiffObj = timeToNextPracticeObj()
  const minTimeDiff = timeDiffObj[card.level]
  return timeDiff >= minTimeDiff
}

export const DateToYYYYMMDD = (date) => date.toISOString().slice(0, 10)

export const getTodaysStats = async () => {
  const endpoint = `/api/users/me/statistics/today`
  const options = {
    headers: makeHeaders()
  }

  try {
    const response = await fetch(endpoint, options)
    const data = await response.json()
    return data.statistic
  } catch (error) {
    console.log(error)
  }
}

export const getMyStatistics = async () => {
  const endpoint = `/api/users/me/statistics/`
  const options = {
    headers: makeHeaders()
  }
  try {
    const response = await fetch(endpoint, options)
    const data = await response.json()
    if (data.statistics) {
      return data.statistics
    } else if (data.message) {
      console.log(data.message)
    }
  } catch (error) {
    console.log(error)
  }
}

export const saveBlob = (blob) => {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', blob.name);

  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
}

export const getTemplate = async () => {
  const endpoint = `/api/templates/import/`
  const options = { headers: makeHeaders() }
  try {
    const response = await fetch(endpoint, options)
    const blob = await response.blob()
    blob.lastModifiedDate = new Date()
    blob.name = "apprendio-template.xlsx"
    saveBlob(blob)
    return true
  } catch (error) {
    console.log(error)
  }
}

export const phoneNum = (phoneNumStr) => phoneNumStr[0] === "+" ?
  `${phoneNumStr.slice(0, 3)} ${phoneNumStr.slice(3, 6)} ${phoneNumStr.slice(6)}`
  : `${phoneNumStr.slice(0, 4)} ${phoneNumStr.slice(5)}`

export const greetServer = async () => {
  const response = await fetch("/api/hello")
  const data = await response.json()
  console.log(data)
}

export const isValidEmail = (string) => {
  const parts = string.split("@")
  if (parts.length !== 2) return false

  const [user, domain] = parts
  if (user.length === 0 || domain.length === "") return false

  const domainParts = domain.split(".")
  if (domainParts.length < 2) return false

  return true
}
