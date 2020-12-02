import React from 'react';
import './Minefield.scss';
import { Minefield as MinefieldModel } from '../../models/Minefield';
import { Field as FieldModel } from '../../models/Field';
import Field from '../Field';
import { tryToRevealField } from '../../utilities/MinefieldManager';
import { cloneDeep } from 'lodash';

export interface MinefieldProps {
    minefield: MinefieldModel;
    enabled: boolean;
    onMinefieldChange: (minefield: MinefieldModel) => void;
    onMineDetonated: () => void;
}

class Minefield extends React.Component<MinefieldProps> {
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
        this.props.onMinefieldChange(minefield);
        if (!success) this.props.onMineDetonated();
    }

    getMinefieldClone(): MinefieldModel {
        return cloneDeep<MinefieldModel>(this.props.minefield);
    }

    stopMouseEventPropagationIfDisabled = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        if (!this.props.enabled) {
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
