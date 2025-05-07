'use client'

import { useEffect, useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { Login } from '@/actions/login'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Navbar from '@/components/ui/Navbar'
import React from 'react'

const initialState = { error: null }

function Page() {
	const [state, formAction] = useActionState(Login, initialState)
	const router = useRouter()

	useEffect(() => {
		if (state?.success) {
			router.push("/")
		}
	}, [state])


	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />
			<div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md">
					<div>
						<h2 className="mt-2 text-center text-2xl font-bold text-gray-900">
							Log in to your account
						</h2>
					</div>

					{state.error && (
						<div className="text-red-600 text-sm text-center">{state.error}</div>
					)}

					<form action={formAction} className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="username">Username</Label>
							<Input id="username" name="username" type="text" required />
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" name="password" type="password" required />
						</div>

						<Button type="submit" className="w-full" disabled={state.pending}>
							{state.pending ? "Logging in..." : "Login"}
						</Button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Page

