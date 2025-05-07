'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/logout"

export default function Navbar({ username }) {

	return (
		<nav className="select-none w-full px-4 py-3 bg-white shadow flex items-center justify-between">
			<div>
				<Link href="/" className="text-xl font-bold text-gray-900 flex items-center">
					<span>YatzyOnline</span>
					{username && (
						<span className="ml-4 text-sm font-medium text-gray-800" style={{ transform: 'translateY(1px)' }}>{`Welcome, ${username}`}</span>
					)}
				</Link>
			</div>

			<div className="space-x-2 hidden md:flex items-center">
				{username ? (
					<>
						<Link href="/">
							<Button variant="ghost">Lobbies</Button>
						</Link>
						<Link href="/">
							<Button variant="ghost">Stats</Button>
						</Link>
						<Link href="/">
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

			{/* FAKE Hamburger menu for mobile */}
			<div className="md:hidden">
				<Button variant="outline">☰</Button>
			</div>
		</nav>
	);
}

