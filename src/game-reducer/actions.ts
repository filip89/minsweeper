import { Field } from "../models/Field";
import { MinefieldSettings } from '../models/MinefieldSettings';

type PressField = {
    type: 'pressField';
    field: Field;
}

type MarkField = {
    type: 'markField';
    field: Field;
}

type Reset = {
    type: 'reset';
    settings: MinefieldSettings
}

type GameAction = MarkField | PressField | Reset;

function pressFieldAction(field: Field): PressField {
    return {
        type: 'pressField',
        field: field
    };
}

function markFieldAction(field: Field): MarkField {
    return {
        type: 'markField',
        field: field
    };
}

function resetAction(settings: MinefieldSettings): Reset {
    return {
        type: 'reset',
        settings
    };
}

export {pressFieldAction, markFieldAction, resetAction};
export type {PressField, MarkField, Reset, GameAction};