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

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function GameWindow({ lobbyID }) {
	const [gameState, setGameState] = useState(null); // This is used for actaul game (loaded from game)
	const [playersInLobby, setPlayersInLobby] = useState(null); // This is only used for waiting screen (loaded from lobby)
	const [me, setMe] = useState(null);

	useEffect(() => {

		fetch(BACKEND_URL + "/auth/me", {
			credentials: "include",
		})
			.then(async (res) => {
				if (res.ok) {
					const data = await res.json();
					setMe(data.username);
				} else if (res.status === 401) {
					// Not logged in
					setMe(null);
				} else {
					// Other errors
					console.error("Unexpected error:", res.status);
					setMe(null);
				}
			})
			.catch((err) => {
				console.error("Fetch failed:", err);
				setMe(null);
			});

		let active = true;

		async function poll() {
			while (active) {
				try {
					const res = await fetch(`${BACKEND_URL}/logic/lobby/${lobbyID}/gameState`, {
						method: "GET",
						credentials: "include",
						headers: { "Content-Type": "application/json" }
					});

					if (res.status === 200) {
						const data = await res.json();
						console.log("GETTING GAME SUCCESS")
						console.log(data)
						setGameState(data.game);
					} else if (res.status === 404) {
						// Game hasn't started yet — no need to log
						const lobbyRes = await fetch(`${BACKEND_URL}/lobbies/${lobbyID}`, {
							method: "GET",
							credentials: "include",
							headers: { "Content-Type": "application/json" }
						});
						if (lobbyRes.ok) {
							const data = await lobbyRes.json();
							setPlayersInLobby(data.players);
						}
					} else {
						// Unexpected response — only now we log
						console.error(`Unexpected response: ${res.status}`);
					}
				} catch (err) {
					// Only log actual network errors or bugs
					console.error("Polling failed", err);
				}
				await new Promise(resolve => setTimeout(resolve, 1000));
			}
		}


		poll();

		return () => {
			active = false;
		};
	}, [lobbyID]);

	async function handleCellClick(_e) {
		// Send updates to the server here
	}

	async function handleRollClick(_e) {
		if (!gameState || !me) return;

		const currentPlayer = gameState.players.find(p => p.player.username === me);

		if (currentPlayer?.isTurn) {
			console.log("ROLL: It's your turn!");
			await fetch(`${BACKEND_URL}/game/roll`, {
				method: "POST",
				body: JSON.stringify({
					lobbyId: lobbyID,
					username: me,
				}),
				credentials: "include",
				headers: { "Content-Type": "application/json" }
			});


		} else {
			console.log("ROLL: It's not your turn!");
		}
	}

	async function startGame() {
		await fetch(`${BACKEND_URL}/game`, {
			method: "POST",
			body: JSON.stringify({
				lobbyId: lobbyID
			}),
			credentials: "include",
			headers: { "Content-Type": "application/json" }
		});
		console.log("GAME STARTED")
	}

	if (!gameState && playersInLobby) {
		return (
			<div className="select-none h-[90vh] flex items-center justify-center">
				<Card className="p-4 w-fit max-h-[93vh] overflow-auto items-center mr-4">
					<h1>PLAYERS IN LOBBY:</h1>
					{playersInLobby.map((player, idx) => (
						<div key={`player-${idx}`} className="border border-gray-300 p-2 font-semibold text-center bg-gray-100">
							{player?.username || "Unknown"}
						</div>
					))}
				</Card>
				<Button onClick={startGame}>START GAME</Button>
			</div>
		);
	} else {

		const getPlayerScore = (player, category) => {
			// Find the score for the given category for the player
			const scoreEntry = player.scoreboard[category]; // Access the category directly from the scoreboard
			return scoreEntry ? scoreEntry.value : 0; // Return the score value or 0 if not set
		};
		return (
			<div className="select-none h-[90vh] flex items-center justify-center">
				<Card className="p-4 w-fit max-h-[93vh] overflow-auto items-center mr-4">
					<Card className="p-4 w-fit max-h-[93vh] overflow-auto items-center">
						{gameState?.diceValues?.map((value, index) => (
							<Dice nr={value} key={index} />
						))}
					</Card>
					<p>Roll count: {gameState?.throwCount}/3</p>
					{gameState &&
						me &&
						gameState.players?.find(p => p.player.username === me)?.isTurn && (
							<Button
								onClick={handleRollClick}
								className={`${gameState.throwCount === 3
									? "opacity-50 cursor-not-allowed pointer-events-none"
									: ""
									}`}
							>
								ROLL
							</Button>
						)}
				</Card>

				{gameState && (
					<Card className="p-4 w-fit max-h-[93vh] overflow-auto">
						<div className={`grid border border-gray-300 text-sm`} style={{ gridTemplateColumns: `200px repeat(${gameState.players.length}, 100px)` }}>
							<div className="font-semibold border border-gray-300 p-2 bg-gray-100">Name</div>

							{gameState.players.map((player, idx) => (
								<div
									key={`player-${idx}`}
									className={player.isTurn ? "border border-gray-300 p-2 font-semibold text-center bg-blue-100" : "border border-gray-300 p-2 font-semibold text-center"}
								>
									{player.player.username}
								</div>
							))}

							{categories.map((cat, idx) => {
								const highlight = ["TOTAL", "BONUS 50 points", "Total score"].includes(cat);
								const labelCellClass = `border border-gray-300 p-2 ${highlight ? "bg-gray-100 font-semibold" : ""}`;

								// Mapping the category names to scoreboard keys
								const scoreboardCategoryMap = {
									"Ones": "ones",
									"Twos": "twos",
									"Threes": "threes",
									"Fours": "fours",
									"Fives": "fives",
									"Sixes": "sixes",
									"One pair": "onePairs",
									"Two pairs": "twoPairs",
									"Three pairs": "threePairs",
									"Three of a kind": "threeOfAKind",
									"Four of a kind": "fourOfAKind",
									"Two x Three of a kind": "twoXThreeOfAKind",
									"Small straight 1-2-3-4-5": "smallStraight",
									"Large straight 2-3-4-5-6": "largeStraight",
									"Royal straight 1-2-3-4-5-6": "royalStraight",
									"Full house (3 + 2 of a kind)": "fullHouse",
									"Chance": "chance",
									"YATZY": "yatzy",
									"Total score": "totalScore",
									"BONUS 50 points": "bonus",
								};

								const scoreboardKey = scoreboardCategoryMap[cat];

								return (
									<React.Fragment key={`row-${idx}`}>
										<div className={labelCellClass}>{cat}</div>
										{gameState.players.map((player, i) => {
											const valueCellClass = `border border-gray-300 p-2 text-center ${highlight ? "bg-gray-100 font-semibold" : "hover:bg-blue-100"}`;

											// Get the score for the current category and player using the mapped scoreboard key
											const playerScore = getPlayerScore(player, scoreboardKey);

											return (
												<div
													onClick={(e) => handleCellClick(e)}
													key={`cell-${idx}-${i}`}
													className={valueCellClass}
												>
													{playerScore}
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
}

