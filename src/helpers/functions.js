import { baseURL, headers } from "./constants"
import { makeHeaders } from "./auth"
import { timeToNextPracticeObj } from "./constants"

export const login = async (username, password) => {
  const options = {
      headers: makeHeaders(),
      method: "POST",
      body: JSON.stringify({ username, password })
    }

  try {
    const tryLogin = await fetch("/api/login", options)
    const data = await tryLogin.json()
    return data
  } catch (error) {
    console.log(error, "something went wrong during login")
    return { error }
  }
}

export const getCard = async (cardId) => {
  try {
    const options = {
      headers: makeHeaders()
    }
    const response = await fetch(`/api/cards/${cardId}`, options)
    const data = await response.json()
    if (response.status === 200) {
      return data.card
    } else {
      console.log(data)
      return null
    }
  } catch (error) {
    console.log("something went wrong fetching the category's cards")
  }
}

export const updateCard = async (cardId, cardBody) => {
  try {
    const options = {
      method: "PUT",
      headers: makeHeaders(),
      body: JSON.stringify(cardBody)
    }
    const response = await fetch(`/api/cards/${cardId}`, options)
    const data = await response.json()
    if (response.status === 200) {
      return data.card
    } else {
      console.log(data)
      return null
    }
  } catch (error) {
    console.log("something went wrong updating the card")
  }
}

export const getCards = async (categoryId) => {
  try {
    const options = {
      headers: makeHeaders()
    }
    const response = await fetch(`/api/categories/${categoryId}/cards`, options)
    if (response.status === 200) {
      const data = await response.json()
      return data.cards
    } else {
      console.log(response.status)
    }
  } catch (error) {
    console.log("something went wrong fetching the category's cards")
  }
}

export const changeCardStats = async (cardId, changeBy) => {
  const options = {
    method: "PATCH",
    headers: makeHeaders()
  }

  try {
    const response = await fetch(`/api/cards/${cardId}?changeBy=${changeBy}`, options)
    if (response.status === 200) {
      const data = await response.json()
      const card = data.card
      return card
    }
  } catch (error) {
    console.log("error modifying card", cardId)
    return false
  }
}

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

export const phoneNum = (phoneNumStr) => phoneNumStr[0] === "+" ?
  `${phoneNumStr.slice(0, 3)} ${phoneNumStr.slice(3, 6)} ${phoneNumStr.slice(6)}`
  : `${phoneNumStr.slice(0, 4)} ${phoneNumStr.slice(5)}`

export const greetServer = async () => {
  const response = await fetch("/api/hello")
  const data = await response.json()
  console.log(data)
}
