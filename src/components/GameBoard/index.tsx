import * as React from 'react';
import Minefield from '../Minefield';
import { Minefield as MinefieldModel } from '../../models/Minefield';
import GameStatus from '../GameStatus';
import './GameBoard.scss';

export interface GameBoardProps {
    minefield: MinefieldModel;
    enabled: boolean;
    onMinefieldChange: (minefield: MinefieldModel) => void;
    onMineDetonated: () => void;
}

const GameBoard: React.FC<GameBoardProps> = (props) => {
    return (
        <div className="game-board">
            <GameStatus />
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
