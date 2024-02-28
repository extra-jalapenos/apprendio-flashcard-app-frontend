import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router"
import CardPair from "./CardPair"
import CardStats from "./CardStatistics"
import { baseURL, headers, shuffle, maxLevel } from "../../helpers/constants"
import { makeHeaders } from "../../helpers/functions"
import { readyForPractice } from "../../helpers/functions"
import { sessionContext, userContext } from "../../App"
export default function Practice () {

  // const { user, setUser } = useContext(userContext)
  const { setSessionStats } = useContext(sessionContext)
  const { categoryId, cardId } = useParams()
  const navigate = useNavigate()

  const [category, setCategory] = useState(null)
  const [cards, setCards] = useState(null)
  const [currentCardIndex, setCurrentCardIndex] = useState(null)
  const [currentCard, setCurrentCard] = useState(null)

  const [showAnswer, setShowAnswer] = useState(false)
  const [userEntry, setUserEntry] = useState("")
  const [evaluation, setEvaluation] = useState(null)

  const getCategory = () => {
    const get = async () => {
      try {
        const options = {
          headers: makeHeaders()
        }
        console.log(categoryId, `/api/categories/${categoryId}`)
        const response = await fetch(`/api/categories/${categoryId}`, options)
        if (response.status === 200) {
          const data = await response.json()
          setCategory(data.category)
        }
      } catch (error) {
        console.log("something went wrong fetching the category")
      }
    }
    get()
  }

  useEffect(getCategory, [categoryId])

  const getCards = () => {
    const get = async () => {
      try {
        const options = {
          headers: makeHeaders()
        }
        const response = await fetch(`/api/categories/${categoryId}/cards`, options)
        if (response.status === 200) {
          const data = await response.json()
          const cards = data.cards
          const filteredCards = cards.filter(card => readyForPractice(card) === true)
          if (filteredCards) {
            const shuffledCards = shuffle(filteredCards)
            setCards(shuffledCards)
            setCurrentCardIndex(0)
            navigate("/practice/"+ categoryId + "/" + shuffledCards[0].id)
          } else {
            setCards([])
          }
        } else {
          console.log(response.status)
        }
      } catch (error) {
        console.log("something went wrong fetching the category's cards")
      }
    }
    get()
  }

  useEffect(getCards, [])

  const getCurrentCard = () => {
    if (currentCardIndex === null) {
      return
    }
    console.log("getting card num", currentCardIndex, cards[currentCardIndex])
    const get = async () => {
      try {
        const options = {
          headers: makeHeaders()
        }
        const response = await fetch(`/api/cards/${cardId}`, options)
        if (response.status === 200) {
          const data = await response.json()
          setCurrentCard(data.card)
        }
      } catch (error) {
        console.log("something went wrong fetching the card")
      }
    }
    get()
  }

  useEffect(getCurrentCard, [currentCardIndex])

  if (!category) {
    return (
      <div className="center">
        <h3>Loading category…</h3>
        <p>This might take some time.</p>
      </div>
    )
  }

  if (!cards) {
    return (
      <div className="center">
        <h3>Loading cards in {category.name}…</h3>
        <p>This might take some time.</p>
      </div>
    )
  }

  if (cards && cards.length === 0) {
    return (
      <div className="center">
        <h3>Whoops!</h3>
        <p>There are no cards to practice for "{category.name}".</p>
        <button onClick={() => navigate("/new-entry")}>➕ Add Entry</button>
      </div>
    )
  }

  if (!currentCard) {
    return `Error loading card ${currentCardIndex}`
  }

  const handleEntry = (event) => setUserEntry(event.target.value)

  const handleSubmit = () => {
    currentCard.answer.match(userEntry) ? setEvaluation(true) : setEvaluation(false)
    setShowAnswer(true)
  }

  const logCorrect = () => {
    increaseCardStats("correct")

    // if (user) {
    //   updateUserStats("correct")
    // } else {
    //   increaseSessionStats("correct")
    // }

    // setUserEntry("")
    next()
  }

  const logWrong = () => {
    increaseCardStats("wrong")

    // if (user) {
    //   updateUserStats("wrong")
    // } else {
    //   increaseSessionStats("wrong")
    // }
    // setUserEntry("")
    next()
  }

  const increaseCardStats = async (keyName) => {
    const body = {
      repetitions: currentCard.repetitions + 1
    }

    if (currentCard.level < maxLevel && keyName === "correct") {
      body.level = currentCard.level + 1
    }

    if (keyName === "correct") {
      body.lastAskedAt = new Date().toISOString()
    }

    const options = {
      method: "PUT",
      headers: makeHeaders(),
      body: JSON.stringify(body)
    }

    console.log(options)
    try {
      const response = await fetch(`/api/cards/${currentCard.id}`, options)
      if (response.status === 200) {
        const data = await response.json()
        const card = data.card
        console.log("success modifying card", card)
      }
    } catch (error) {
        console.log("error modifying card", cardId)
    }
  }

  // const increaseSessionStats = (keyName) => {
  //   const sessionStatsOld = JSON.parse(sessionStorage.getItem("sessionStats"))
  //   const sessionStatsNew = {...sessionStatsOld, [keyName]: sessionStatsOld[keyName]+1}
  //   sessionStorage.setItem("sessionStats", JSON.stringify(sessionStatsNew))
  //   setSessionStats(sessionStatsNew)
  // }

  // const updateUserStats = (type) => {
  //   if (!type || !user) return
  //   const endpoint = "/users/" + user.id

  //     const body = {
  //       statistics: {...user.statistics, [type]: user.statistics[type] + 1}
  //     }

  //     const options = {
  //       method: "PATCH",
  //       headers: headers,
  //       body: JSON.stringify(body)
  //     }

  //     fetch(baseURL + endpoint, options)
  //       .then(response => response.json())
  //       .then(data => setUser(data))
  //       .catch(error => console.log(error, "error updating user"))
  // }

  const next = () => {
    if (currentCardIndex + 1 < cards.length) {
      const nextCard = cards[Number(currentCardIndex + 1)]
      setCurrentCardIndex(currentCardIndex+1)
      navigate("/practice/"+ categoryId + "/" + nextCard.id)
    } else {
      navigate("/")
    }
  }

  return (
    <>
      <CardStats props={currentCard} />
      <CardPair props={currentCard} revealAnswer={showAnswer} handleEntry={handleEntry}/>
      {evaluation === null &&
        <div className="buttoncontainer">
          <button onClick={() => handleSubmit()}>Enter</button>
          <button className="red" onClick={() => next()}>Next →</button>
        </div>
      }
      {evaluation !== null &&
      <div className="buttoncontainer">
        <button className="circlebutton green" onClick={() => logCorrect()}>✓</button>
        <button className="circlebutton red" onClick={() => logWrong()}>×</button>
      </div>
      }
    </>
  )
}
