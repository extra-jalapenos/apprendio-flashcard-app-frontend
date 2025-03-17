class APIClient  {
	constructor (BASE_URL) {
		this.base_url = BASE_URL
	}

	makeHeaders () {
		const headers = new Headers()
		headers.set("content-type", "application/json")
		headers.set("content-type", "application/json")
		const token = sessionStorage.getItem("token")
		if (token) {
			headers.set("Authorization", "Bearer " + token)
		}
		return headers
	}

	async call (method, uri, body) {
		try {
			const options = {
				headers: this.makeHeaders(),
				method
			}
			if (body) options.body = body

			const response = await fetch(this.base_url + uri, options)
			if (!(response.status >= 200 && response.status < 300)) throw response
			if (response.status === 204) return response
			return await response.json()
		} catch (error) {
			const headerMessage = error.headers.get("message")
			const message = headerMessage || error.statusText
			return new Error(message)
		}
	}

	async login ({ username, password }) {
		return await this.call("POST", "/login", JSON.stringify({ username, password }))
	}

	async register ({ username, email, password }) {
		return await this.call("POST", "/register", JSON.stringify({ username, email, password }))
	}

	async getCard (cardId) {
		return await this.call("GET", `/cards/${cardId}`)
	}

	async getCardsInCategory (categoryId) {
		return await this.call("GET", `/categories/${categoryId}/cards`)
	}

	async createCard ({ categoryId, prompt, answer, hint }) {
		return await this.call("POST", "/cards", JSON.stringify({ categoryId, prompt, answer, hint, lastAskedAt: null }))
	}

	async updateCard ({ cardId, prompt, answer, hint }) {
		return await this.call("PUT", `/cards/${cardId}`, JSON.stringify({ cardId, prompt, answer, hint }))
	}

	async changeCardStats ({ cardId, changeBy }) {
		return await this.call("PATCH", `/cards/${cardId}?changeBy=${changeBy}`)
	}

	async deleteCard (cardId) {
		return await this.call("DELETE", `/cards/${cardId}`)
	}

	async getCategory (categoryId) {
		return await this.call("GET", `/categories/${categoryId}`)
	}

	async getCategories () {
		return await this.call("GET", "/users/me/categories")
	}

	async getCategoriesWithCards () {
		// this is not a mistake, the cards are included in their category-element: categories: [ ... cards: [] ]
		return await this.call("GET", "/users/me/categories/details")
	}

	async createCategory (name) {
		return await this.call("POST", "/categories", JSON.parse({ name }))
	}

	async deleteCategory (categoryId) {
		return await this.call("DELETE", `/categories/${categoryId}`)
	}

	async getTodaysStats () {
		return await this.call("GET", "/users/me/statistics/today")
	}

	async updateTodaysStats ({ correct, incorrect }) {
		const queryParams = []
    if (correct > 0) {
      queryParams.push(`correct=${correct}`)
    }
    if (incorrect > 0) {
      queryParams.push(`incorrect=${incorrect}`)
    }

    if (queryParams.length === 0) return
    const queryParamStr = () => {
      if (queryParams.length > 0) return "?" + queryParams.join("&")
      return
    }

		return await this.call("PATCH", `/users/me/statistics/today${queryParamStr()}`)
	}

	async getStatistics () {
		return await this.call("GET", "/users/me/statistics")
	}
}

const { VITE_API_URL } = import.meta.env
if (!VITE_API_URL) throw new Error("API URL not defined!")
export const api = new APIClient(VITE_API_URL)
