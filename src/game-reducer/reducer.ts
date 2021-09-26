import { cloneDeep } from 'lodash';
import { Field } from '../models/Field';
import { GameAction } from './actions';
import { tryToRevealField } from '../utilities/MinefieldManager';
import { Minefield } from '../models/Minefield';
import createMinefield from '../utilities/MinefieldBuilder';
import { MinefieldSettings } from '../models/MinefieldSettings';

export interface GameState {
    minefield: Minefield;
    enabled: boolean; //disabled when game won or lost
    isPlaying: boolean; //when first field clicked - until reset
    won: boolean;
}

export function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case 'markField': {
            return markField(state, action.field);
        }
        case 'pressField': {
            return pressField(state, action.field);
        }
        case 'reset': {
            return resetGame(action.settings);
        }
        default: {
            return state;
        }
    }
}

function resetGame(settings: MinefieldSettings): GameState {
    return {
        isPlaying: false,
        won: false,
        enabled: true,
        minefield: createMinefield(settings),
    };
}

function markField(state: GameState, field: Field): GameState {
    const [minefieldClone, fieldClone] = getClones(state.minefield, field);
    fieldClone.marked = !fieldClone.marked;
    return {
        ...state,
        minefield: minefieldClone,
    };
}

function pressField(state: GameState, field: Field): GameState {
    const [minefieldClone, fieldClone] = getClones(state.minefield, field);
    const mineRevealed: boolean = tryToRevealField(minefieldClone, fieldClone);
    const newState: GameState = {
        ...state,
        minefield: minefieldClone,
    };
    if (!state.isPlaying) {
        newState.isPlaying = true;
    }
    if (!mineRevealed) {
        newState.enabled = false;
    } else if (noMinesLeft(minefieldClone)) {
        newState.enabled = false;
        newState.won = true;
    }
    return newState;
}

function getClones(minefield: Minefield, field: Field): [Minefield, Field] {
    const minefieldClone = cloneDeep<Minefield>(minefield);
    const fieldClone = minefieldClone[field.row][field.column];
    return [minefieldClone, fieldClone];
}

function noMinesLeft(minefield: Minefield): boolean {
    return !minefield.some((row) => row.some((field) => !field.hasMine && !field.revealed));
}
