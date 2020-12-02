import React from 'react';
import './Minefield.scss';
import { Minefield as MinefieldModel } from '../../models/Minefield';
import { Field as FieldModel } from '../../models/Field';
import Field from '../Field';
import { tryToRevealField } from '../../utilities/MinefieldManager';
import { cloneDeep } from 'lodash';

export interface MinefieldProps {
    minefield: MinefieldModel;
    onMinefieldChange: (minefield: MinefieldModel) => void;
}

export interface MinefieldState {
    disabled: boolean;
}

class Minefield extends React.Component<MinefieldProps, MinefieldState> {
    state: MinefieldState = {
        disabled: false,
    };

    toggleMarkField({ row, column }: FieldModel): void {
        let minefield = this.getMinefieldClone();
        const cloneField: FieldModel = minefield[row][column];
        cloneField.marked = !cloneField.marked;
        this.props.onMinefieldChange(minefield);
    }

    onFieldRevealAttempt({ row, column }: FieldModel): void {
        let minefield = this.getMinefieldClone();
        const cloneField: FieldModel = minefield[row][column];
        const success: boolean = tryToRevealField(minefield, cloneField);
        this.setState({
            disabled: !success,
        });
        this.props.onMinefieldChange(minefield);
    }

    getMinefieldClone(): MinefieldModel {
        return cloneDeep<MinefieldModel>(this.props.minefield);
    }

    stopMouseEventPropagationIfDisabled = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        if (this.state.disabled) {
            event.stopPropagation();
        }
    };

    onContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.preventDefault();
    };

    render() {
        return (
            <div
                className="minefield"
                onMouseDownCapture={this.stopMouseEventPropagationIfDisabled}
                onMouseUpCapture={this.stopMouseEventPropagationIfDisabled}
                onContextMenuCapture={this.onContextMenu}
            >
                {this.props.minefield.map((row, rowIndex) => (
                    <div className="minefield__row" key={rowIndex}>
                        {row.map((field) => (
                            <Field
                                key={field.id}
                                data={field}
                                toggleMark={() => this.toggleMarkField(field)}
                                attemptReveal={() => this.onFieldRevealAttempt(field)}
                            ></Field>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

export default Minefield;
