import React, { useEffect } from 'react';
import { Minefield } from '../../models/Minefield';
import { CgSmileSad, CgSmileMouthOpen, CgSmileNeutral } from 'react-icons/cg';
import './GameStatus.scss';

export interface GameStatusProps {
    mineCount: number;
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

    //TODO count manually?
    function getMarkedFieldsCount(): number {
        return props.minefield.reduce<number>((acc, row) => {
            return (
                row.reduce<number>((rowAcc, field) => {
                    return field.marked ? rowAcc + 1 : rowAcc;
                }, 0) + acc
            );
        }, 0);
    }

    function getMineCountDisplay(): string {
        let minesLeft: number = props.mineCount - getMarkedFieldsCount();
        return getCounterDisplay(minesLeft);
    }

    function getSmileyFace() {
        if (props.enabled) return <CgSmileNeutral />;
        return props.won ? <CgSmileMouthOpen fill="yellow" /> : <CgSmileSad />;
    }

    function getCounterDisplay(count: number): string {
        if (count >= 999) return (999).toString();
        if (count <= -99) return (-99).toString();
        return ('00' + count).slice(-3);
    }

    return (
        <div className="game-board__status game-status">
            <div className="game-status__counter">{getMineCountDisplay()}</div>
            <a className="game-status__smiley" role="button" onClick={props.onReset}>
                {getSmileyFace()}
            </a>
            <div className="game-status__counter">{getCounterDisplay(time)}</div>
        </div>
    );
};

export default GameStatus;
