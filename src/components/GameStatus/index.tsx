import React, { useContext, useEffect, useMemo } from 'react';
import { CgSmileSad, CgSmileMouthOpen, CgSmileNeutral } from 'react-icons/cg';
import './GameStatus.scss';
import { GameContext } from '../../game-context';
import { getMarkedFieldsCount } from '../../utilities/getMarkedFieldsCount';

export interface GameStatusProps {
    mineCount: number;
    onReset: () => void;
}

const GameStatus: React.FC<GameStatusProps> = (props) => {
    const [time, setTime] = React.useState(1);
    const { minefield, enabled, isPlaying, won } = useContext(GameContext);

    const markedFieldsCount = useMemo(() => getMarkedFieldsCount(minefield), [minefield]);

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
            return !isPlaying;
        }
    }, [enabled, isPlaying, time]);

    function getMineCountDisplay(): string {
        let minesLeft: number = props.mineCount - markedFieldsCount;
        return getCounterDisplay(minesLeft);
    }

    function getSmileyFace() {
        if (enabled) return <CgSmileNeutral />;
        return won ? <CgSmileMouthOpen fill="yellow" /> : <CgSmileSad />;
    }

    function getCounterDisplay(count: number): string {
        if (count >= 999) return (999).toString();
        if (count <= -99) return (-99).toString();
        return ('00' + count).slice(-3);
    }

    return (
        <div className="game-status">
            <div className="game-status__counter">{getMineCountDisplay()}</div>
            <a className="game-status__smiley" role="button" onClick={props.onReset}>
                {getSmileyFace()}
            </a>
            <div className="game-status__counter">{getCounterDisplay(time)}</div>
        </div>
    );
};

export default GameStatus;
