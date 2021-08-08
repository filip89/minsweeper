import { Field } from '../models/Field';
import { Minefield } from '../models/Minefield';
import { MinefieldSettings } from '../models/MinefieldSettings';
import { getAdjacentFields } from './getAdjacentFields';

export default function createMinefield(gameSettings: MinefieldSettings): Minefield {
    const minefield: Minefield = generateEmptyMinefield(gameSettings.rows, gameSettings.columns);
    plantMines(minefield, gameSettings.mines);
    return minefield;
}

function generateEmptyMinefield(rows: number = 10, columns: number = 10): Minefield {
    const minefield: Minefield = [];
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        let row: Field[] = [];
        for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
            row.push(new Field(rowIndex, columnIndex));
        }
        minefield.push(row);
    }
    return minefield;
}

function plantMines(minefield: Minefield, minesCount: number): void {
    let i = 0;
    while (i < minesCount) {
        plantMine(minefield);
        i++;
    }
}

function plantMine(minefield: Minefield): void {
    let field: Field = getRandomMinableField(minefield);
    field.hasMine = true;
    updateMineAdjacentFields(minefield, field);
}

//TODO change this logic; make minfield copy for draft and splice fields out of it as you plant mines
function getRandomMinableField(minefield: Minefield): Field {
    let field: Field;
    do {
        field = getRandomField(minefield);
    } while (field.hasMine);
    return field;
}

function getRandomField(minefield: Minefield): Field {
    const row: number = getRandomInt(minefield.length);
    const column: number = getRandomInt(minefield[0].length);
    const field: Field = minefield[row][column];
    return field;
}

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

function updateMineAdjacentFields(minefield: Minefield, field: Field): void {
    const adjacentFields: Field[] = getAdjacentFields(minefield, field);
    adjacentFields.forEach((field) => ++field.adjacentMines);
}
