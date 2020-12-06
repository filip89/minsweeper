import * as React from 'react';
import { Minefield } from '../../models/Minefield';

export interface GameStatusProps {
    minefield: Minefield;
    onReset: () => void;
}

const GameStatus: React.FC<GameStatusProps> = (props) => {
    function getMarkedFieldsCount(): number {
        return props.minefield.reduce<number>((acc, row) => {
            return (
                row.reduce<number>((rowAcc, field) => {
                    return field.marked ? rowAcc + 1 : rowAcc;
                }, 0) + acc
            );
        }, 0);
    }

    return (
        <header className="game-board__status">
            <div>{getMarkedFieldsCount()}</div>
            <button type="button" onClick={props.onReset}>
                :)
            </button>
        </header>
    );
};

export default GameStatus;
