export const baseURL = "http://localhost:4000"
// export const baseURL = import.meta.env.BASE_URL

export const headers = {
  "content-type": "application/json"
}

export const entryBlueprint = {
  "categoryId": "",
  "stage": 0,
  "last": "",
  "repetitions": {
    "correct": 0,
    "wrong": 0
  },
"prompt": "",
"answer": ""
}

export const maxStage = 10

const dayInMilliseconds = 1000 * 60 * 60 * 24

const timeToNextPractice = (stage) => stage ** 2.4 * dayInMilliseconds

export const timeToNextPracticeObj = () => {
  const obj = {}

  for (let i = 0; i <= maxStage; i++) {
    obj[String(i)] = parseInt(timeToNextPractice(i).toFixed(0))
  }

  return obj
}

export const siteTitle = "🧠"

export const shuffle = (array) => array.sort(() => Math.random() - 0.5)
