import React from 'react';
import './Minefield.scss';
import { Minefield as MinefieldModel } from '../../models/Minefield';
import { Field as FieldModel } from '../../models/Field';
import Field from '../Field';
import defaultSettings from '../GameSettings/DefaultSettings';
import createMinefield from '../../utilities/MinefieldBuilder';
import { tryToRevealField } from '../../utilities/MinefieldManager';
import { cloneDeep  } from 'lodash';

export interface MinefieldProps {}

//TODO rename minefield to data and rename this component to Minefield
export interface MinefieldState {
    minefield: MinefieldModel;
    disabled: boolean;
}

class Minefield extends React.Component<MinefieldProps, MinefieldState> {
    state: MinefieldState = {
        minefield: createMinefield(defaultSettings),
        disabled: false,
    };

    toggleMarkField({ row, column }: FieldModel): void {
        let minefield = this.getMinefieldClone();
        const cloneField: FieldModel = minefield[row][column];
        cloneField.marked = !cloneField.marked;
        console.log(cloneField.marked);

        this.setState({ minefield: minefield });
    }

    onFieldRevealAttempt({ row, column }: FieldModel): void {
        let minefield = this.getMinefieldClone();
        const cloneField: FieldModel = minefield[row][column];
        const success: boolean = tryToRevealField(minefield, cloneField);
        this.setState({
            minefield: minefield,
            disabled: !success,
        });
    }

    getMinefieldClone(): MinefieldModel {
        return cloneDeep<MinefieldModel>(this.state.minefield);
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
                {this.state.minefield.map((row, rowIndex) => (
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
