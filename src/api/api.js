class APIClient  {
	constructor () { }

	makeHeaders () {
		const headers = new Headers()
		headers.set("content-type", "application/json")
		const token = sessionStorage.getItem("token")
		if (token) {
			headers.set("Authorization", "Bearer " + token)
		}
		return headers
	}

	async call (method, url, body) {
		try {
			const options = {
				headers: this.makeHeaders(),
				method
			}
			if (body) options.body = body

			const response = await fetch(url, options)
			if (!response.ok) return response
			return await response.json()
		} catch (error) {
			console.error(error)
			return { message: error.message }
		}
	}

	async login ({ username, password }) {
		return await this.call("POST", "/api/login", JSON.stringify({ username, password }))
	}

	async getCard (cardId) {
		return await this.call("GET", `/api/cards/${cardId}`)
	}

	async getCardsInCategory (categoryId) {
		return await this.call("GET", `/api/categories/${categoryId}/cards`)
	}

	async updateCard ({ cardId, prompt, answer, hint }) {
		return await this.call("PUT", `/api/cards/${cardId}`, JSON.stringify({ cardId, prompt, answer, hint }))
	}

	async changeCardStats ({ cardId, changeBy }) {
		return await this.call("PATCH", `/api/cards/${cardId}?changeBy=${changeBy}`)
	}

	async deleteCard (cardId) {
		return await this.call("DELETE", `/api/cards/${cardId}`)
	}

	async getCategory (categoryId) {
		return await this.call("GET", `/api/categories/${categoryId}`)
	}

	async getCategories () {
		return await this.call("GET", "api/users/me/categories")
	}

	async deleteCategory (categoryId) {
		return await this.call("DELETE", `api/categories/${categoryId}`)
	}

	async getTodaysStats () {
		return await this.call("GET", "/api/users/me/statistics/today")
	}

	async getStatistics () {
		return await this.call("GET", "api/users/me/statistics")
	}
}

export const api = new APIClient()
