import * as React from 'react';
import Minefield from '../Minefield';
import { Minefield as MinefieldModel } from '../../models/Minefield';
import GameStatus from '../GameStatus';
import './GameBoard.scss';

export interface GameBoardProps {
    minefield: MinefieldModel;
    onMinefieldChange: (minefield: MinefieldModel) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ minefield, onMinefieldChange }) => {
    return (
        <div className="game-board">
            <GameStatus />
            <Minefield minefield={minefield} onMinefieldChange={onMinefieldChange} />
        </div>
    );
};

export default GameBoard;
