'use client'
import { Button } from '@/components/ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"

export default function JoinButton({ onClick, disabled }) {
	return (
		<div>
			<TooltipProvider>
				{disabled ? (
					<Tooltip>
						<TooltipTrigger asChild>
							<div className="relative flex justify-center mt-2">
								{/* Join Button */}
								<Button
									className={`w-24 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
									onClick={onClick}
									disabled={disabled}
								>
									Join
								</Button>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>You must be logged in to join a game</p>
						</TooltipContent>
					</Tooltip>
				) : (
					<div className="relative flex justify-center mt-2">
						{/* Join Button */}
						<Button
							className="w-24"
							onClick={onClick}
							disabled={disabled}
						>
							Join
						</Button>
					</div>
				)}
			</TooltipProvider>
		</div>
	)
}

