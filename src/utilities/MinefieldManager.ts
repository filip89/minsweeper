import { Field } from '../models/Field';
import { Minefield } from '../models/Minefield';
import { getAdjacentFields } from './getAdjacentFields';

export function tryToRevealField(minefield: Minefield, field: Field): boolean {
    let success: boolean;
    if (field.hasMine) {
        detonateMine(minefield, field);
        success = false;
    } else {
        revealField(minefield, field);
        success = true;
    }
    return success;
}

function detonateMine(minefield: Minefield, field: Field): void {
    field.detonated = true;
    revealUnmarkedMines(minefield);
    revealWronglyMarkedFields(minefield);
}

function revealField(minefield: Minefield, field: Field): void {
    field.revealed = true;
    if (!field.adjacentMines) {
        revealAdjacentFields(minefield, field);
    }
}

function revealUnmarkedMines(minefield: Minefield): void {
    minefield.forEach((row) => {
        row.forEach((field) => {
            if (field.hasMine && !field.marked) {
                field.revealed = true;
            }
        });
    });
}

function revealWronglyMarkedFields(minefield: Minefield): void {
    minefield.forEach((row) => {
        row.forEach((field) => {
            if (field.marked && !field.hasMine) {
                field.revealed = true;
            }
        });
    });
}

function revealAdjacentFields(minefield: Minefield, field: Field): void {
    const adjacentFields: (Field | undefined)[] = getAdjacentFields(minefield, field);
    adjacentFields.forEach((adjacentField) => {
        if (adjacentField && !adjacentField.revealed && !adjacentField.marked) {
            revealField(minefield, adjacentField);
        }
    });
}
