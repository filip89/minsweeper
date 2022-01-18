import React, { useState, useContext, useEffect } from 'react';
import { GameContext } from '../../game-context';
import { getCounterDisplay } from '../../utilities/getCounterDisplay';

interface TimerProps {}

const Timer: React.FC<TimerProps> = () => {
    const [time, setTime] = useState(0);
    const { enabled, isPlaying } = useContext(GameContext);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (shouldCount()) {
            timeout = setTimeout(() => setTime(time + 1), 1000);
        } else if (shouldReset()) {
            setTime(0);
        }
        return () => clearTimeout(timeout);

        function shouldCount(): boolean {
            return isPlaying && enabled;
        }

        function shouldReset(): boolean {
            return !isPlaying && enabled;
        }
    }, [enabled, isPlaying, time]);

    return <>{getCounterDisplay(time)}</>;
};

export default Timer;
