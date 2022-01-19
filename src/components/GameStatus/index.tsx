import React, { useContext, useMemo } from 'react';
import { CgSmileSad, CgSmileMouthOpen, CgSmileNeutral } from 'react-icons/cg';
import './GameStatus.scss';
import { GameContext } from '../../game-context';
import { getMarkedFieldsCount } from '../../utilities/getMarkedFieldsCount';
import Timer from '../Timer';
import { getCounterDisplay } from '../../utilities/getCounterDisplay';

export interface GameStatusProps {
    mineCount: number;
    onReset: () => void;
}

const GameStatus: React.FC<GameStatusProps> = (props) => {
    const { minefield, status } = useContext(GameContext);

    const markedFieldsCount = useMemo(() => getMarkedFieldsCount(minefield), [minefield]);

    function getMineCountDisplay(): string {
        let minesLeft: number = props.mineCount - markedFieldsCount;
        return getCounterDisplay(minesLeft);
    }

    function getSmileyFace() {
        if (status === 'playing' || status === 'pristine') return <CgSmileNeutral />;
        return status === 'won' ? <CgSmileMouthOpen fill="yellow" /> : <CgSmileSad />;
    }

    return (
        <div className="game-status">
            <div className="game-status__counter">{getMineCountDisplay()}</div>
            <a className="game-status__smiley" role="button" onClick={props.onReset}>
                {getSmileyFace()}
            </a>
            <div className="game-status__counter">
                <Timer></Timer>
            </div>
        </div>
    );
};

export default GameStatus;
