import React, { useState, useContext, useEffect } from 'react';
import { GameContext } from '../../game-context';
import { getCounterDisplay } from '../../utilities/getCounterDisplay';

interface TimerProps {}

const Timer: React.FC<TimerProps> = () => {
    const [time, setTime] = useState(0);
    const { status } = useContext(GameContext);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (status === 'playing') {
            timeout = setTimeout(() => setTime(time + 1), 1000);
        } else if (status === 'won' || status === 'lost') {
            setTime(0);
        }
        return () => clearTimeout(timeout);
    }, [status, time]);

    return <>{getCounterDisplay(time)}</>;
};

export default Timer;
