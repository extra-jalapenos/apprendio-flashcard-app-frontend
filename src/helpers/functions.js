import { timeToNextPracticeObj } from "./constants"
import { makeHeaders } from "./auth"

export const readyForPractice = (card) => {
  if (!card.lastAskedAt) return true
  const last = new Date(card.lastAskedAt)
  const timeDiff = new Date() - last
  const timeDiffObj = timeToNextPracticeObj()
  const minTimeDiff = timeDiffObj[card.level]
  return timeDiff >= minTimeDiff
}

export const DateToYYYYMMDD = (date) => date.toISOString().slice(0, 10)
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
