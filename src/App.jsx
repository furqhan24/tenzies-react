import { useState, useRef, useEffect } from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = useState(() => generateAllNewDice())
    const buttonRef = useRef(null)

    const gameWon = dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)
        
    useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon])

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }))
    }

    function rollDice() {
        if (!gameWon) {
            setDice(oldDice => oldDice.map(die =>
                die.isHeld ?
                    die :
                    { ...die, value: Math.ceil(Math.random() * 6) }
            ))
        }
        else {
            setDice(generateAllNewDice());
        }
    }

    function hold(id) {
        setDice(oldDice => oldDice.map(die =>
            die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        ))
    }

    const diceElements = dice.map(dieObj => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}
        />
    ))

    return (
        <main className="min-h-dvh bg-[#e9eef2] px-4 py-6 text-[#18232d] sm:px-6 sm:py-10">
            {gameWon && <Confetti />}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>

            <section className="mx-auto flex w-full max-w-xl flex-col rounded-lg border border-[#d8e0e7] bg-white p-5 shadow-[0_18px_45px_rgba(24,35,45,0.12)] sm:p-8">
                <div className="flex items-start justify-between gap-4 border-b border-[#e5eaee] pb-5 sm:pb-6">
                    <div>
                        <p className="text-xs font-extrabold text-[#16877e]">DICE GAME</p>
                        <h1 className="mt-1 text-4xl font-black tracking-normal sm:text-5xl">Tenzies</h1>
                    </div>
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#18232d] text-sm font-black text-white" aria-label="Ten dice">
                        10
                    </span>
                </div>

                <p className="mx-auto mt-5 max-w-sm text-center text-sm leading-6 text-[#52616d] sm:text-base">
                    Roll until every die matches. Select a die to keep its value on the next roll.
                </p>

                <div className="mt-7 grid grid-cols-5 gap-2 sm:mt-8 sm:gap-3">
                    {diceElements}
                </div>

                <button
                    ref={buttonRef}
                    className="mt-8 min-h-12 rounded-lg bg-[#18232d] px-6 py-3 text-base font-extrabold text-white transition-colors hover:bg-[#2c3b47] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16877e]"
                    onClick={rollDice}
                >
                    {gameWon ? "New Game" : "Roll Dice"}
                </button>
            </section>
        </main>
    )
}
