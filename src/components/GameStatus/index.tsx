import React, { useState, useContext, useEffect, useMemo } from 'react';
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
    const { minefield, enabled, won } = useContext(GameContext);

    const markedFieldsCount = useMemo(() => getMarkedFieldsCount(minefield), [minefield]);

    function getMineCountDisplay(): string {
        let minesLeft: number = props.mineCount - markedFieldsCount;
        return getCounterDisplay(minesLeft);
    }

    function getSmileyFace() {
        if (enabled) return <CgSmileNeutral />;
        return won ? <CgSmileMouthOpen fill="yellow" /> : <CgSmileSad />;
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
