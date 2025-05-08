import { Card } from "./card";
import React from "react";

const categories = [
	"Ones", "Twos", "Threes", "Fours", "Fives", "Sixes",
	"TOTAL", "BONUS 50 points",
	"One pair", "Two pairs", "Three pairs", "Three of a kind", "Four of a kind", "Two x Three of a kind",
	"Small straight 1-2-3-4-5", "Large straight 2-3-4-5-6",
	"Royal straight 1-2-3-4-5-6", "Full house (3 + 2 of a kind)", "Chance", "YATZY",
	"Total score"

];

// TODO: We need to get this data from DB
const playerCount = 8;

export default function GameWindow() {
	return (
		<div className="select-none h-[90vh] flex items-center justify-center">
			<Card className="p-4 w-fit max-h-[93vh] overflow-auto">
				<div
					className={`grid border border-gray-300 text-sm`}
					style={{
						gridTemplateColumns: `200px repeat(${playerCount}, 100px)`
					}}
				>
					{/* Header */}
					<div className="font-semibold border border-gray-300 p-2 bg-gray-100">Name</div>
					{[...Array(playerCount)].map((_, idx) => (
						<div key={`player-${idx}`} className="border border-gray-300 p-2 font-semibold text-center bg-gray-100">
							{/* Playername goes here */}
							Player {idx + 1}
						</div>
					))}

					{categories.map((cat, idx) => {
						const highlight = [
							"TOTAL",
							"BONUS 50 points",
							"Total score"
						].includes(cat);

						const labelCellClass = `border border-gray-300 p-2 ${highlight ? "bg-gray-100 font-semibold" : ""}`;

						return (
							<React.Fragment key={`row-${idx}`}>
								<div className={labelCellClass}>{cat}</div>
								{[...Array(playerCount)].map((_, i) => {
									const valueCellClass = `border border-gray-300 p-2 text-center ${highlight ? "bg-gray-100 font-semibold" : " hover:bg-blue-100"
										}`;
									return (
										<div key={`cell-${idx}-${i}`} className={valueCellClass}>
											{/* Input or value goes here */}
										</div>
									);
								})}
							</React.Fragment>
						);
					})}

				</div>
			</Card>
		</div>
	);
}

