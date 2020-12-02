import * as React from 'react';
import Minefield from '../Minefield';
import GameStatus from '../GameStatus';
import './GameBoard.scss';

export interface GameBoardProps {}

const GameBoard: React.FC<GameBoardProps> = () => {
    return (
        <div className="game-board">
            <GameStatus />
            <Minefield />
        </div>
    );
};

export default GameBoard;
