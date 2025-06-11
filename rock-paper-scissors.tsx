"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type Choice = "rock" | "paper" | "scissors"
type GameResult = "win" | "lose" | "tie" | null

interface GameState {
  playerChoice: Choice | null
  computerChoice: Choice | null
  result: GameResult
  playerScore: number
  computerScore: number
  isPlaying: boolean
}

export default function Component() {
  const [gameState, setGameState] = useState<GameState>({
    playerChoice: null,
    computerChoice: null,
    result: null,
    playerScore: 0,
    computerScore: 0,
    isPlaying: false,
  })

  const choices: Choice[] = ["rock", "paper", "scissors"]

  const getChoiceEmoji = (choice: Choice | null) => {
    switch (choice) {
      case "rock":
        return "🪨"
      case "paper":
        return "📄"
      case "scissors":
        return "✂️"
      default:
        return "❓"
    }
  }

  const getChoiceColor = (choice: Choice) => {
    switch (choice) {
      case "rock":
        return "from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"
      case "paper":
        return "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
      case "scissors":
        return "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
    }
  }

  const determineWinner = (playerChoice: Choice, computerChoice: Choice): GameResult => {
    if (playerChoice === computerChoice) return "tie"

    if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      return "win"
    }

    return "lose"
  }

  const getResultMessage = (result: GameResult) => {
    switch (result) {
      case "win":
        return "🎉 You Win!"
      case "lose":
        return "😔 You Lose!"
      case "tie":
        return "🤝 It's a Tie!"
      default:
        return ""
    }
  }

  const getResultColor = (result: GameResult) => {
    switch (result) {
      case "win":
        return "text-green-600 bg-green-100"
      case "lose":
        return "text-red-600 bg-red-100"
      case "tie":
        return "text-yellow-600 bg-yellow-100"
      default:
        return ""
    }
  }

  const playGame = (playerChoice: Choice) => {
    setGameState((prev) => ({ ...prev, isPlaying: true, playerChoice }))

    // Add suspense with a delay
    setTimeout(() => {
      const computerChoice = choices[Math.floor(Math.random() * choices.length)]
      const result = determineWinner(playerChoice, computerChoice)

      setGameState((prev) => ({
        ...prev,
        computerChoice,
        result,
        playerScore: result === "win" ? prev.playerScore + 1 : prev.playerScore,
        computerScore: result === "lose" ? prev.computerScore + 1 : prev.computerScore,
        isPlaying: false,
      }))
    }, 1000)
  }

  const resetGame = () => {
    setGameState({
      playerChoice: null,
      computerChoice: null,
      result: null,
      playerScore: 0,
      computerScore: 0,
      isPlaying: false,
    })
  }

  const playAgain = () => {
    setGameState((prev) => ({
      ...prev,
      playerChoice: null,
      computerChoice: null,
      result: null,
      isPlaying: false,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur-sm shadow-2xl">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Rock Paper Scissors
            </h1>
            <p className="text-gray-600">Choose your weapon and battle the computer!</p>
          </div>

          {/* Score Board */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold">{gameState.playerScore}</div>
                  <div className="text-sm opacity-90">You</div>
                </div>
                <div className="text-2xl font-bold opacity-75">VS</div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{gameState.computerScore}</div>
                  <div className="text-sm opacity-90">Computer</div>
                </div>
              </div>
            </div>
          </div>

          {/* Game Area */}
          <div className="mb-8">
            {gameState.isPlaying ? (
              <div className="text-center py-12">
                <div className="text-6xl animate-bounce mb-4">🤔</div>
                <div className="text-xl font-semibold text-gray-600">Computer is thinking...</div>
              </div>
            ) : gameState.result ? (
              <div className="text-center py-8">
                {/* Choices Display */}
                <div className="flex justify-center items-center gap-8 mb-6">
                  <div className="text-center">
                    <div className="text-6xl mb-2">{getChoiceEmoji(gameState.playerChoice)}</div>
                    <div className="text-sm font-medium text-gray-600">Your Choice</div>
                  </div>
                  <div className="text-4xl font-bold text-gray-400">VS</div>
                  <div className="text-center">
                    <div className="text-6xl mb-2">{getChoiceEmoji(gameState.computerChoice)}</div>
                    <div className="text-sm font-medium text-gray-600">Computer's Choice</div>
                  </div>
                </div>

                {/* Result */}
                <div
                  className={`inline-block px-6 py-3 rounded-2xl text-xl font-bold ${getResultColor(gameState.result)}`}
                >
                  {getResultMessage(gameState.result)}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎮</div>
                <div className="text-xl font-semibold text-gray-600">Make your choice!</div>
              </div>
            )}
          </div>

          {/* Choice Buttons */}
          {!gameState.isPlaying && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              {choices.map((choice) => (
                <Button
                  key={choice}
                  onClick={() => playGame(choice)}
                  className={`h-24 rounded-2xl bg-gradient-to-r ${getChoiceColor(choice)} text-white shadow-lg active:scale-95 transition-all duration-200`}
                  disabled={gameState.isPlaying}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-1">{getChoiceEmoji(choice)}</div>
                    <div className="text-sm font-medium capitalize">{choice}</div>
                  </div>
                </Button>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            {gameState.result && (
              <Button
                onClick={playAgain}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl shadow-lg active:scale-95 transition-all"
              >
                Play Again
              </Button>
            )}
            {(gameState.playerScore > 0 || gameState.computerScore > 0) && (
              <Button
                onClick={resetGame}
                className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl shadow-lg active:scale-95 transition-all"
              >
                Reset Score
              </Button>
            )}
          </div>

          {/* Game Rules */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-2">Game Rules:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div>🪨 Rock crushes ✂️ Scissors</div>
              <div>✂️ Scissors cuts 📄 Paper</div>
              <div>📄 Paper covers 🪨 Rock</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
