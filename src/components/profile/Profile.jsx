import { useEffect, useState } from "react"
import Loading from "../loadingScreen/Loading"
import { makeHeaders } from "../../helpers/auth"

export default function Profile () {
	const [user, setUser] = useState(null)

	const getProfile = () => {
		const get = async () => {
			try {
				const endpoint = `/api/profile/me`
				const options = {
					method: "GET",
					headers: makeHeaders()
				}

				const response = await fetch(endpoint, options)
				const data = await response.json()
				const { user } = data
				setUser(user)
			} catch (error) {
				console.log(error)
			}
		}

		get()
	}

	useEffect(getProfile, [])

	if (!user) return <Loading />
	const { profile, username, email } = user
	const { firstName, lastName } = profile

	return (
		<div className="center">
			<h2>My Profile</h2>
			<form>
				<p className="formfield-label">First Name</p>
				<input className="formfield" name="firstName" autoComplete="firstName" defaultValue={firstName}/>
				<p className="formfield-label">Last Name</p>
				<input className="formfield" name="lastName" autoComplete="lastName" defaultValue={lastName}/>
				<p className="formfield-label">Username</p>
				<input className="formfield" name="username" autoComplete="username" defaultValue={username}/>
				<p className="formfield-label">email</p>
				<input className="formfield" name="email" autoComplete="email" defaultValue={email}/>
			</form>
		</div>
	)
}
