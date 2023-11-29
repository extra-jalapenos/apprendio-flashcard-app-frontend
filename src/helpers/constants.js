export const baseURL = "http://localhost:3000"

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

const shuffle = (array) => array.sort(() => Math.random() - 0.5)