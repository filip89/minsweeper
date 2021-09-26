import { Field } from "../models/Field";
import { Minefield } from "../models/Minefield";
import cloneDeep from 'lodash/cloneDeep';

export interface MinefieldAction {
    type: 'markField' | 'revealField' | 'pressField',
    payload: Field
}

export function minefieldReducer(minefield: Minefield, action: MinefieldAction): Minefield {
    let newMinefield: Minefield = cloneDeep<Minefield>(minefield);
    return newMinefield;
}