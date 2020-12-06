import * as React from 'react';
import Minefield from '../Minefield';
import { Minefield as MinefieldModel } from '../../models/Minefield';
import GameStatus from '../GameStatus';
import './GameBoard.scss';
import { MinefieldSettings } from '../../models/MinefieldSettings';

export interface GameBoardProps {
    minefield: MinefieldModel;
    enabled: boolean;
    onMinefieldChange: (minefield: MinefieldModel) => void;
    onMineDetonated: () => void;
    onReset: () => void;
}

const GameBoard: React.FC<GameBoardProps> = (props) => {
    return (
        <div className="game-board">
            <GameStatus minefield={props.minefield} onReset={props.onReset} />
            <Minefield
                minefield={props.minefield}
                onMinefieldChange={props.onMinefieldChange}
                enabled={props.enabled}
                onMineDetonated={props.onMineDetonated}
            />
        </div>
    );
};

export default GameBoard;
