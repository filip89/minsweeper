import { Field } from "../models/Field";
import { Minefield } from "../models/Minefield";

export function getAdjacentFields(minefield: Minefield, field: Field): Field[] {
    return [
        minefield[field.row][field.column - 1],
        minefield[field.row][field.column + 1],
        minefield[field.row - 1]?.[field.column - 1],
        minefield[field.row - 1]?.[field.column],
        minefield[field.row - 1]?.[field.column + 1],
        minefield[field.row + 1]?.[field.column - 1],
        minefield[field.row + 1]?.[field.column],
        minefield[field.row + 1]?.[field.column + 1],
    ].filter(field => field);
}