export const baseURL = "http://localhost:3000"

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

export const siteTitle = "7️⃣ 🧠 🛁 Seven Brains"

export const shuffle = (array) => array.sort(() => Math.random() - 0.5)