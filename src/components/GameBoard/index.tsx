import * as React from 'react';
import Minefield from '../Minefield';
import { Minefield as MinefieldModel } from '../../models/Minefield';
import GameStatus from '../GameStatus';
import './GameBoard.scss';

export interface GameBoardProps {
    minefield: MinefieldModel;
    enabled: boolean;
    onMinefieldChange: (minefield: MinefieldModel, mineDetonated?: boolean) => void;
    onReset: () => void;
    isPlaying: boolean;
    won: boolean;
}

const GameBoard: React.FC<GameBoardProps> = (props) => {
    return (
        <div className="game-board">
            <GameStatus minefield={props.minefield} onReset={props.onReset} isPlaying={props.isPlaying} enabled={props.enabled} won={props.won} />
            <Minefield
                minefield={props.minefield}
                onMinefieldChange={props.onMinefieldChange}
                enabled={props.enabled}
            />
        </div>
    );
};

export default GameBoard;
