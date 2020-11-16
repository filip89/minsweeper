import * as React from 'react';
import { Field as FieldModel } from '../models/Field';
import './Field.scss';
import { BsFillFlagFill } from 'react-icons/bs';
import { GiTellerMine } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';
import { JsxEmit } from 'typescript';

const shouldUseCache: (prevProps: FieldProps, nextProps: FieldProps) => boolean = (prevProps, nextProps) => {
    if (prevProps.disabled !== nextProps.disabled) return false;
    if (prevProps.data.marked !== nextProps.data.marked) return false;
    if (prevProps.data.revealed !== nextProps.data.revealed) return false;
    if (prevProps.data.detonated !== nextProps.data.detonated) return false;
    return true;
};

export interface FieldProps {
    data: FieldModel;
    disabled: boolean;
    reveal: () => void;
    toggleMark: () => void;
}

const Field: React.FC<FieldProps> = React.memo<FieldProps>((props) => {
    const { data: field, disabled } = props;

    function onMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        event.preventDefault();
        if (event.button === 2) {
            if (disabled) return;
            if (field.revealed) return;
            props.toggleMark();
        }
    }

    function onMouseUp(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        event.preventDefault();
        if (event.button === 0) {
            if (disabled) return;
            if (field.marked) return;
            if (field.revealed) return;
            props.reveal();
        }
    }

    function onContextMenu(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        event.preventDefault();
    }

    function getConditionalClassNames(): string {
        let classNames = '';
        if (field.revealed) classNames += ' field--revealed';
        if (field.revealed && field.detonated) classNames += ' field--detonated';
        if (disabled) classNames += ' field--disabled';
        return classNames;
    }

    function getView(): JSX.Element {
        if (field.revealed && field.marked && !field.hasMine) {
            return getWronglyMarkedView();
        }
        if (field.marked) {
            return getMarkedView();
        }
        if (field.revealed) {
            if (field.hasMine) {
                return getRevealedMineView();
            }
            if (field.adjacentMines) {
                return getRevealedMinelessView();
            }
        }
        return <></>;
    }

    function getWronglyMarkedView(): JSX.Element {
        return (
            <div className="field__wrong-mark-container">
                <div className="field__wrong-mark">
                    <MdClose color="red" />
                </div>
                <GiTellerMine />
            </div>
        );
    }

    function getMarkedView(): JSX.Element {
        return <BsFillFlagFill className="field__flag" color="#b90000" />;
    }

    function getRevealedMineView(): JSX.Element {
        return <GiTellerMine />;
    }

    function getRevealedMinelessView(): JSX.Element {
        return (
            <span className={'field__adjacent-mines field__adjacent-mines--' + field.adjacentMines}>
                {field.adjacentMines}
            </span>
        );
    }

    return (
        <div
            className={'field' + getConditionalClassNames()}
            onContextMenu={onContextMenu}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        >
            {getView()}
        </div>
    );
}, shouldUseCache);

export default Field;
