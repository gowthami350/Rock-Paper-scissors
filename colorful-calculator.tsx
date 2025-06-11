"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "*":
        return firstValue * secondValue
      case "/":
        return firstValue / secondValue
      case "=":
        return secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = Number.parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  return (
    <div className="mx-auto max-w-sm p-6">
      <div className="rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-6 shadow-2xl">
        <div className="mb-6 rounded-2xl bg-gray-900 p-4 shadow-inner">
          <div className="text-right text-4xl font-bold text-white overflow-hidden">{display}</div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {/* First Row */}
          <Button
            onClick={clear}
            className="col-span-2 h-16 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-xl font-bold text-white shadow-lg hover:from-red-600 hover:to-red-700 active:scale-95 transition-all"
          >
            Clear
          </Button>
          <Button
            onClick={() => performOperation("/")}
            className="h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-xl font-bold text-white shadow-lg hover:from-orange-600 hover:to-orange-700 active:scale-95 transition-all"
          >
            ÷
          </Button>
          <Button
            onClick={() => performOperation("*")}
            className="h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-xl font-bold text-white shadow-lg hover:from-orange-600 hover:to-orange-700 active:scale-95 transition-all"
          >
            ×
          </Button>

          {/* Second Row */}
          <Button
            onClick={() => inputNumber("7")}
            className="h-16 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-700 text-xl font-bold text-white shadow-lg hover:from-gray-700 hover:to-gray-800 active:scale-95 transition-all"
          >
            7
          </Button>
          <Button
            onClick={() => inputNumber("8")}
            className="h-16 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-700 text-xl font-bold text-white shadow-lg hover:from-gray-700 hover:to-gray-800 active:scale-95 transition-all"
          >
            8
          </Button>
          <Button
            onClick={() => inputNumber("9")}
            className="h-16 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-700 text-xl font-bold text-white shadow-lg hover:from-gray-700 hover:to-gray-800 active:scale-95 transition-all"
          >
            9
          </Button>
          <Button
            onClick={() => performOperation("-")}
            className="h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-xl font-bold text-white shadow-lg hover:from-orange-600 hover:to-orange-700 active:scale-95 transition-all"
          >
            −
          </Button>

          {/* Third Row */}
          <Button
            onClick={() => inputNumber("4")}
            className="h-16 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-700 text-xl font-bold text-white shadow-lg hover:from-gray-700 hover:to-gray-800 active:scale-95 transition-all"
          >
            4
          </Button>
          <Button
            onClick={() => inputNumber("5")}
            className="h-16 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-700 text-xl font-bold text-white shadow-lg hover:from-gray-700 hover:to-gray-800 active:scale-95 transition-all"
          >
            5
          </Button>
          <Button
            onClick={() => inputNumber("6")}
            className="h-16 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-700 text-xl font-bold text-white shadow-lg hover:from-gray-700 hover:to-gray-800 active:scale-95 transition-all"
          >
            6
          </Button>
          <Button
            onClick={() => performOperation("+")}
            className="h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-xl font-bold text-white shadow-lg hover:from-orange-600 hover:to-orange-700 active:scale-95 transition-all"
          >
            +
          </Button>

          {/* Fourth Row */}
          <Button
            onClick={() => inputNumber("1")}
            className="h-16 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-700 text-xl font-bold text-white shadow-lg hover:from-gray-700 hover:to-gray-800 active:scale-95 transition-all"
          >
            1
          </Button>
          <Button
            onClick={() => inputNumber("2")}
            className="h-16 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-700 text-xl font-bold text-white shadow-lg hover:from-gray-700 hover:to-gray-800 active:scale-95 transition-all"
          >
            2
          </Button>
          <Button
            onClick={() => inputNumber("3")}
            className="h-16 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-700 text-xl font-bold text-white shadow-lg hover:from-gray-700 hover:to-gray-800 active:scale-95 transition-all"
          >
            3
          </Button>
          <Button
            onClick={handleEquals}
            className="row-span-2 h-[8.5rem] rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-2xl font-bold text-white shadow-lg hover:from-green-600 hover:to-green-700 active:scale-95 transition-all"
          >
            =
          </Button>

          {/* Fifth Row */}
          <Button
            onClick={() => inputNumber("0")}
            className="col-span-2 h-16 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-700 text-xl font-bold text-white shadow-lg hover:from-gray-700 hover:to-gray-800 active:scale-95 transition-all"
          >
            0
          </Button>
          <Button
            onClick={inputDecimal}
            className="h-16 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-700 text-xl font-bold text-white shadow-lg hover:from-gray-700 hover:to-gray-800 active:scale-95 transition-all"
          >
            .
          </Button>
        </div>
      </div>
    </div>
  )
}
