import * as React from 'react';
import { Field as FieldModel } from '../models/Field';
import './Field.scss';
import { BsFillFlagFill } from 'react-icons/bs';
import { GiTellerMine } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';

const shouldCache: (prevProps: FieldProps, nextProps: FieldProps) => boolean = (prevProps, nextProps) => {
    if (prevProps.data.marked !== nextProps.data.marked) return false;
    if (prevProps.data.revealed !== nextProps.data.revealed) return false;
    if (prevProps.data.detonated !== nextProps.data.detonated) return false;
    return true;
};

export interface FieldProps {
    data: FieldModel;
    reveal: () => void;
    toggleMark: () => void;
}

const Field: React.FC<FieldProps> = React.memo<FieldProps>((props) => {
    const field = props.data;

    function onMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        if (event.button === 2 && !field.revealed) {
            props.toggleMark();
        }
    }

    function onMouseUp(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        if (event.button === 0 && field.revealable) {
            props.reveal();
        }
    }

    function getConditionalClassNames(): string {
        let classNames = '';
        if (field.revealed) classNames += ' field--revealed';
        if (field.detonated) classNames += ' field--detonated';
        return classNames;
    }

    function getView(): JSX.Element | string {
        if (field.revealed) {
            return getRevealedView();
        } else if (field.marked) {
            return <BsFillFlagFill className="field__flag" color="#b90000" />;
        }
        return '';
    }

    function getRevealedView(): JSX.Element | '' {
        if (field.hasMine) {
            return <GiTellerMine />;
        } else if (field.marked) {
            return getWronglyMarkedView();
        } else {
            return getRevealedMinelessView();
        }
    }

    function getWronglyMarkedView(): JSX.Element {
        return (
            <div className="field__wrong-mark">
                <GiTellerMine />
                <MdClose size="25" color="red" />
            </div>
        );
    }

    function getRevealedMinelessView(): JSX.Element | '' {
        return field.adjacentMines ? (
            <span className={'field__adjacent-mines field__adjacent-mines--' + field.adjacentMines}>
                {field.adjacentMines}
            </span>
        ) : (
            ''
        );
    }

    return (
        <div className={'field' + getConditionalClassNames()} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
            {getView()}
        </div>
    );
}, shouldCache);

export default Field;
