import { Card } from "./card";

export default function GameWindow() {
	return (
		<div className="h-[75vh] flex items-center justify-center">
			<div>
				<Card className={"p-8"}>
					<h1 className="text-2xl font-bold">GAMES GOES HERE</h1>
				</Card>
			</div>
		</div>
	)
}
