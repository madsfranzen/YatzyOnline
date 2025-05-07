'use client'

import { Button } from '@/components/ui/button'

export default function JoinButton({ onClick }) {
	return (
		<div className="flex justify-center mt-2">
			<Button className="w-24" onClick={onClick}>
				Join
			</Button>
		</div>
	)
}

