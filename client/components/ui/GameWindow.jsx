import React, { useEffect, useState } from "react";
import Dice from "../Dice";
import { Button } from "./button";
import { Card } from "./card";

const categories = [
	"Ones", "Twos", "Threes", "Fours", "Fives", "Sixes",
	"TOTAL", "BONUS 50 points",
	"One pair", "Two pairs", "Three pairs", "Three of a kind", "Four of a kind", "Two x Three of a kind",
	"Small straight 1-2-3-4-5", "Large straight 2-3-4-5-6",
	"Royal straight 1-2-3-4-5-6", "Full house (3 + 2 of a kind)", "Chance", "YATZY",
	"Total score"
];

const playerCount = 8;
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function GameWindow({ lobbyID }) {
	const [gameState, setGameState] = useState(null); // This could include dice, scores, etc.

	useEffect(() => {
		let active = true;

		async function poll() {
			while (active) {
				try {
					const res = await fetch(`${BACKEND_URL}/logic/lobby/${lobbyID}/gameState`, {
						method: "GET",
						credentials: "include", // required for cookie auth
						headers: { "Content-Type": "application/json" }
					});

					if (res.ok) {
						const data = await res.json();
						console.log(data)
						console.log(data.game)
						setGameState(data.game); // Update state with new game data
					}
				} catch (err) {
					console.error("Polling failed", err);
				}
				await new Promise(resolve => setTimeout(resolve, 1000)); // wait before next request
			}
		}

		poll();

		return () => {
			active = false;
		};
	}, [lobbyID]);

	async function handleCellClick(e) {
		// Send updates to the server here
	}

	return (
		<div className="select-none h-[90vh] flex items-center justify-center">
			<Card className="p-4 w-fit max-h-[93vh] overflow-auto items-center mr-4">
				<Card className="p-4 w-fit max-h-[93vh] overflow-auto items-center">
					{[...Array(6)].map((_, index) => (
						<Dice nr={index + 1} key={index} />
					))}
				</Card>
				<Button>
					ROLL
				</Button>
			</Card>

			{gameState && (
				<Card className="p-4 w-fit max-h-[93vh] overflow-auto">
					<div className={`grid border border-gray-300 text-sm`} style={{ gridTemplateColumns: `200px repeat(${playerCount}, 100px)` }}>
						<div className="font-semibold border border-gray-300 p-2 bg-gray-100">Name</div>
						{gameState.players.map((_, idx) => (
							<div key={`player-${idx}`} className="border border-gray-300 p-2 font-semibold text-center bg-gray-100">
								Player {idx}
							</div>
						))}

						{categories.map((cat, idx) => {
							const highlight = ["TOTAL", "BONUS 50 points", "Total score"].includes(cat);
							const labelCellClass = `border border-gray-300 p-2 ${highlight ? "bg-gray-100 font-semibold" : ""}`;

							return (
								<React.Fragment key={`row-${idx}`}>
									<div className={labelCellClass}>{cat}</div>
									{gameState.players.map((_, i) => {
										const valueCellClass = `border border-gray-300 p-2 text-center ${highlight ? "bg-gray-100 font-semibold" : " hover:bg-blue-100"}`;
										return (
											<div onClick={(e) => handleCellClick(e)} key={`cell-${idx}-${i}`} className={valueCellClass}>
												{/* Render from gameState if available */}
											</div>
										);
									})}
								</React.Fragment>
							);
						})}
					</div>
				</Card>
			)}
		</div>
	);
}

