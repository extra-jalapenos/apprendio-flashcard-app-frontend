const mockData = {
  "users" : [
    { 
      "id": 1,
      "displayname": "",
      "email": "",
      "password": ""
    }
  ],
  "categories": [
    {
      "id": 1,
      "title": "French",
      "author": "Ally",
    },
    {
      "id": 2,
      "title": "English",
      "author": "Ally",
    }
  ],
  "entries": [{
    "id": 2,
    "question": "Ei",
    "answer": "egg",
    "categoryId": 2,
    "stage": 0,
    "repetitions": {
      "correct": 0,
      "wrong": 0,
      "total": 0
      }
  }],
  "profile": {
    "id": 1,
    "displayname": "",
    "email": ""
  }
}

export { mockData }