'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/logout"

export default function Navbar({ username }) {

	return (
		<nav className="w-full px-4 py-3 bg-white shadow flex items-center justify-between">
			<Link href="/" className="text-xl font-bold text-gray-900">
				YatzyOnline
			</Link>

			<div className="space-x-2 hidden md:flex items-center">
				{username ? (
					<>
						<span className="text-sm font-medium text-gray-800 mr-4">Welcome, {username}</span> {/* Styled username */}
						<Link href="/">
							<Button variant="ghost">Lobbies</Button>
						</Link>
						<Link href="/services">
							<Button variant="ghost">Stats</Button>
						</Link>
						<Link href="/contact">
							<Button variant="ghost">Profile</Button>
						</Link>
						<Button
							onClick={logout}
						>
							Logout
						</Button>
					</>
				) : (
					<Link href="/login">
						<Button>Login</Button>
					</Link>
				)}
			</div>

			{/* Hamburger menu for mobile */}
			<div className="md:hidden">
				<Button variant="outline">☰</Button>
			</div>
		</nav>
	);
}

