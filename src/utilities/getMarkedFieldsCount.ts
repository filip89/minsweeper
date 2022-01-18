import { Minefield } from "../models/Minefield";

export function getMarkedFieldsCount(minefield: Minefield): number {
    return minefield.reduce<number>((acc, row) => {
        return (
            row.reduce<number>((rowAcc, field) => {
                return field.marked ? rowAcc + 1 : rowAcc;
            }, 0) + acc
        );
    }, 0);
}