'use client'
import { Button } from '@/components/ui/button'

export default function JoinButton({ onClick, disabled }) {
	return (
		<div className="flex justify-center mt-2">
			<Button
				className={`w-24 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} // Combine conditional classes
				onClick={onClick}
				disabled={disabled}
			>
				Join
			</Button>
		</div>
	)
}

