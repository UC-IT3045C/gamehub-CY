import { useState, useEffect } from 'react';
import "./wordle.css";

function App() {
    const [wordleGrid, setWordleGrid] = useState([]);
    const [currentRow, setCurrentRow] = useState(0);
    const [currentColumn, setCurrentColumn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState("");
    const [gameConfig, setGameConfig] = useState({
        rows: 5,
        cols: 5,
        word: ""
    });

    useEffect(() => {
        createGameGrid();
        fetchRandomWord();
    }, []);

    async function getRandomWord() {
        const response = await fetch(`https://it3049c-hangman.fly.dev`);
        const result = await response.json();
        return result.word;
    }

    async function fetchRandomWord() {
        let word = await getRandomWord();
        setGameConfig(prevConfig => ({ ...prevConfig, word: word }));
        console.log(word);
    }



    function createGameGrid() {
        const grid = [];
        for (let row = 0; row < gameConfig.rows; row++) {
            const rowCells = [];
            for (let col = 0; col < gameConfig.cols; col++) {
                rowCells.push(<div key={`${row}-${col}`} className="letter" id={`${row}-${col}`}></div>);
            }
            grid.push(<div key={row} className="row">{rowCells}</div>);
        }
        setWordleGrid(grid);
    }
    

    function addLetterToBox(letter, row, col) {
        const cell = document.getElementById(`${row}-${col}`);
        if (cell) {
            cell.innerText = letter.toUpperCase();
        } else {
            console.log(`Cell not found: ${row}-${col}`);
        }
    }

    function isLetter(letter) {
        return letter.length === 1 && letter.match(/[a-z]/i);
    }

    function handleKeyDown(event) {
        if (event.key == `Enter`) {
            if (currentColumn === 4) {
                revealResult()
                setCurrentRow(prevRow => prevRow + 1);
                setCurrentColumn(0);
                setCurrentGuess("");
            }
        }

        if (event.key === `Backspace` && currentColumn > 0) {
            setCurrentColumn(prevCol => prevCol - 1);
            addLetterToBox(``, currentRow, currentColumn);
            setCurrentGuess(prevGuess => prevGuess.slice(currentColumn, -1));
        }

        if (isLetter(event.key)) {
            if (currentColumn !== 5) {
                addLetterToBox(
                    event.key,
                    currentRow,
                    currentColumn
                );
                if (currentColumn === 4) {
                    setCurrentColumn(4);
                } else {
                    setCurrentColumn(prevCol => prevCol + 1);
                }                
                setCurrentGuess(prevGuess => prevGuess + event.key);
            }
        }
    }

    function revealResult() {
        const result = checkWord(gameConfig.word, currentGuess);
        for (let i = 0; i < result.length; i++) {
            const cell = document.getElementById(`${currentRow}-${i}`);
            if (cell) {
                cell.classList.add(result[i]);
            }
        }
    }

    function checkWord(word, guess) {
        const result = [];
        const minLength = Math.min(word.length, guess.length);
        for (let i = 0; i < minLength; i++) {
            if (word[i] === guess[i]) {
                result.push('correct');
            } else if (word.includes(guess[i]) && word.indexOf(guess[i]) !== i) {
                result.push('misplaced');
            } else {
                result.push('incorrect');
            }
        }
        return result;
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentRow, currentColumn, currentGuess]);

    return (
        <div className="App light-Mode">
            <header>
                <h1>Wordle</h1>
            </header>
            <div id="game">
                <div id="wordle-grid">
                    {wordleGrid}
                </div>
            </div>
        </div>
    );
}

export default App;
 