import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button"

function useCountDown({ currentPhaseTime, currentPhaseTimeChange, isLost }) {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(currentPhaseTime * 1000);
    const timerRef = useRef(null);

    const formatTime = (time) => {
        const seconds = Math.floor(time / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);
        return `${seconds}.${milliseconds < 10 ? '0' : ''}${milliseconds}`;
    };

    useEffect(() => {
        currentPhaseTimeChange(isRunning, Number(formatTime(time)))
    }, [isRunning, time])

    useEffect(() => {
        if (isLost){
            clearInterval(timerRef.current);
            setTime(currentPhaseTime * 1000);
            setIsRunning(false);
        }
    }, [isLost])

    const startCountdown = () => {
        if (isRunning) {
            clearInterval(timerRef.current);
            setTime(currentPhaseTime * 1000);
        } else {
            timerRef.current = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(timerRef.current);
                        setTime(currentPhaseTime * 1000);
                        setIsRunning(false);
                    }
                    return prevTime - 10; // Decrease by 10 milliseconds
                });
            }, 10);
        }
        setIsRunning(!isRunning);
    };

    const resetCountdown = () => {
        clearInterval(timerRef.current);
        setTime(currentPhaseTime * 1000);
        setIsRunning(false);
    };

    return (
        <Button variant="gameStartButton" onClick={startCountdown} className={`${isRunning ? 'bg-emerald-600' : 'bg-emerald-500'} ${isRunning && (formatTime(time) <= 5 && 'bg-red-600')}`}> {isRunning ? formatTime(time) : 'START'}</Button>
        // <Button variant="default" onClick={startCountdown} className={`${isRunning && (formatTime(time) <= 5 && 'text-red-300')}`}> {isRunning ? formatTime(time) : 'Start'}</Button>
    )
}

export default useCountDown