import React, { useEffect } from 'react';
import { Minefield } from '../../models/Minefield';

export interface GameStatusProps {
    minefield: Minefield;
    onReset: () => void;
    isPlaying: boolean;
    enabled: boolean;
    won: boolean;
}

const GameStatus: React.FC<GameStatusProps> = (props) => {
    const [time, setTime] = React.useState(1);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (shouldCount()) {
            timeout = setTimeout(() => setTime(time + 1), 1000);
        } else if (shouldReset()) {
            setTime(0);
        }
        return () => clearTimeout(timeout);

        function shouldCount(): boolean {
            return props.isPlaying && props.enabled;
        }

        function shouldReset(): boolean {
            return !props.isPlaying;
        }
    }, [props.enabled, props.isPlaying, time]);

    function getMarkedFieldsCount(): number {
        return props.minefield.reduce<number>((acc, row) => {
            return (
                row.reduce<number>((rowAcc, field) => {
                    return field.marked ? rowAcc + 1 : rowAcc;
                }, 0) + acc
            );
        }, 0);
    }

    function getSmileyFace(): string {
        if (!props.enabled) {
            return props.won ? ':)' : ':(';
        }
        return ':|';
    }

    return (
        <header className="game-board__status">
            <div>{getMarkedFieldsCount()}</div>
            <button type="button" onClick={props.onReset}>
                {getSmileyFace()}
            </button>
            <div>{time}</div>
        </header>
    );
};

export default GameStatus;
