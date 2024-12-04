import { useState, useRef } from "react";

import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}) {
    const timer = useRef();
    const display = useRef();
    const [timeRemaining, settimeRemaining] = useState(targetTime * 1000);

    const timeIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if(timeRemaining <= 0) {
        clearInterval(timer.current);
        display.current.open();
    }

    function handleStart() {
        timer.current = setInterval(() => {
            settimeRemaining((prevTime) => prevTime - 10);
        }, 10);
    }

    function handleStop() {
        clearInterval(timer.current);
        display.current.open();
    }

    function handleReset() {
        settimeRemaining(targetTime * 1000);
    }

    return (
        <>
            <ResultModal ref={display} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timeIsActive ? handleStop : handleStart}>
                        {timeIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timeIsActive ? 'active' : undefined}>
                    {timeIsActive ? 'Time is running...' : 'Timer is inactive'}
                </p>
            </section>
        </>
        
    )
}