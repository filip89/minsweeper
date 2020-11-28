import { Field } from "../models/Field";
import { Minefield } from "../models/Minefield";

export default function getAdjacentFields(minefield: Minefield, { row, column }: Field): Field[] {
    const adjacentFields: Field[] = [];

    if (row >= 1) {
        const previousRowAdjacentFields: Field[] = getThreeHorizontallyAdjacentFields(minefield, row - 1, column);
        adjacentFields.push(...previousRowAdjacentFields);
    }
    if (row <= minefield.length - 2) {
        const nextRowAdjacentFields: Field[] = getThreeHorizontallyAdjacentFields(minefield, row + 1, column);
        adjacentFields.push(...nextRowAdjacentFields);
    }

    adjacentFields.push(...getHorizontalSideFields(minefield, row, column));

    return adjacentFields;
}

function getThreeHorizontallyAdjacentFields(minefield: Minefield, row: number, centerColumn: number): Field[] {
    const adjacentFields: Field[] = [];

    adjacentFields.push(minefield[row][centerColumn]);
    adjacentFields.push(...getHorizontalSideFields(minefield, row, centerColumn));

    return adjacentFields;
}

function getHorizontalSideFields(minefield: Minefield, row: number, column: number): Field[] {
    const adjacentFields: Field[] = [];

    if (column >= 1) {
        adjacentFields.push(minefield[row][column - 1]);
    }
    if (column <= minefield[0].length - 2) {
        adjacentFields.push(minefield[row][column + 1]);
    }

    return adjacentFields;
}