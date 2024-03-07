import { baseURL, headers } from "./constants"
import { timeToNextPracticeObj } from "./constants"

export const makeHeaders = () => {
  const headers = new Headers()
  headers.set("content-type", "application/json")
  const token = sessionStorage.getItem("token")
  if (token) {
    headers.set("Authorization", "Bearer " + token)
  }
  return headers
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
      console.log("error deleting entry, id:", id, error)
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
