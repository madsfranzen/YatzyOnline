// components/Navbar.jsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
	return (
		<nav className="w-full px-4 py-3 bg-white shadow flex items-center justify-between">
			<Link href="/" className="text-xl font-bold text-gray-900">
				YatzyOnline
			</Link>

			{/* TODO: Put actual feautures here */}
			<div className="space-x-2 hidden md:flex">
				<Link href="/">
					<Button variant="ghost">Lobbies</Button>
				</Link>
				<Link href="/services">
					<Button variant="ghost">Stats</Button>
				</Link>
				<Link href="/contact">
					<Button variant="ghost">Profile</Button>
				</Link>
				<Link href="/login">
					<Button>Login</Button>
				</Link>
			</div>

			{/* Hamburger menu for mobile -> NOT yet implemented */}
			<div className="md:hidden">
				<Button variant="outline">☰</Button>
			</div>
		</nav>
	);
}

