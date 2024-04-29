import { useState, useRef } from 'react';

function useCountDown(initialTime) {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(initialTime * 1000);
    const timerRef = useRef(null);

    const formatTime = (time) => {
        const seconds = Math.floor(time / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);
        return `${seconds}.${milliseconds < 10 ? '0' : ''}${milliseconds}`;
    };

    const startCountdown = () => {
        if (isRunning) {
            clearInterval(timerRef.current);
            setTime(initialTime * 1000);
        } else {
            timerRef.current = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(timerRef.current);
                        setTime(initialTime * 1000);
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
        setTime(initialTime * 1000);
        setIsRunning(false);
    };

    return { isRunning, time, startCountdown, resetCountdown, formatTime, initialTime };
}

export default useCountDown