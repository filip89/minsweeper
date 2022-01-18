import * as React from 'react';
import Minefield from '../Minefield';
import GameStatus from '../GameStatus';
import './GameBoard.scss';

export interface GameBoardProps {
    onReset: () => void;
    mineCount: number;
}

const GameBoard: React.FC<GameBoardProps> = (props) => {
    return (
        <div className="game-board">
            <div className="game-board__status">
                <GameStatus mineCount={props.mineCount} onReset={props.onReset} />
            </div>
            <Minefield />
        </div>
    );
};

export default GameBoard;
