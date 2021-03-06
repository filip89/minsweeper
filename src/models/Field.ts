export class Field {
    id: string;
    row: number;
    column: number;
    hasMine: boolean;
    adjacentMines: number;
    revealed: boolean;
    marked: boolean;
    detonated: boolean;
    beingPressed: boolean;

    get revealable(): boolean {
        return !this.revealed && !this.marked;
    }

    constructor(row: number, column: number) {
        this.id = `${row}${column}`;
        this.row = row;
        this.column = column;
        this.hasMine = false;
        this.adjacentMines = 0;
        this.revealed = false;
        this.marked = false;
        this.detonated = false;
        this.beingPressed = false;
    }

}
