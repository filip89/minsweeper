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
    onMinefieldChange: (minefield: MinefieldModel, mineDetonated?: boolean) => void;
}

export interface MinefieldState {
    mouseDown: boolean;
}

class Minefield extends React.Component<MinefieldProps> {
    state: MinefieldState = {
        mouseDown: false,
    };

    toggleMarkField({ row, column }: FieldModel): void {
        let minefield = this.getMinefieldClone();
        const cloneField: FieldModel = minefield[row][column];
        cloneField.marked = !cloneField.marked;
        this.props.onMinefieldChange(minefield);
    }

    atemptFieldReveal({ row, column }: FieldModel): void {
        let minefield = this.getMinefieldClone();
        const cloneField: FieldModel = minefield[row][column];
        const success: boolean = tryToRevealField(minefield, cloneField);
        this.props.onMinefieldChange(minefield, !success);
    }

    getMinefieldClone(): MinefieldModel {
        return cloneDeep<MinefieldModel>(this.props.minefield);
    }

    updateFieldBeingPressed(field?: FieldModel): void {
        let minefield = this.getMinefieldClone();
        minefield.forEach((row) => {
            row.forEach((field) => (field.beingPressed = false));
        });
        if (field) {
            const cloneField: FieldModel = minefield[field.row][field.column];
            cloneField.beingPressed = true;
        }
        this.props.onMinefieldChange(minefield);
    }

    stopMouseEventPropagationIfDisabled = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        if (!this.props.enabled) {
            event.stopPropagation();
        }
    };

    onContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        event.preventDefault();
    };

    handleMouseUp = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        if (event.button === 0) {
            this.setState({ mouseDown: false });
        }
    };

    handleMouseLeave = (): void => {
        if (this.state.mouseDown) {
            this.setState({ mouseDown: false });
            this.updateFieldBeingPressed();
        }
    };

    handleLeftMouseDownOnField(field: FieldModel): void {
        this.setState({ mouseDown: true });
        if (field.revealable) {
            this.updateFieldBeingPressed(field);
        }
    }

    handleLeftMouseUpOnField(field: FieldModel): void {
        if (this.state.mouseDown && field.revealable) {
            this.atemptFieldReveal(field);
        }
    }

    handleMouseEnterField(field: FieldModel): void {
        if (this.state.mouseDown) {
            this.updateFieldBeingPressed(field.revealable ? field : undefined);
        }
    }

    render() {
        return (
            <div
                className="minefield"
                onMouseDownCapture={this.stopMouseEventPropagationIfDisabled}
                onMouseUpCapture={this.stopMouseEventPropagationIfDisabled}
                onContextMenuCapture={this.onContextMenu}
                onMouseLeave={this.handleMouseLeave}
                onMouseUp={this.handleMouseUp}
            >
                <div>
                    {this.props.minefield.map((row, rowIndex) => (
                        <div className="minefield__row" key={rowIndex}>
                            {row.map((field) => (
                                <Field
                                    key={field.id}
                                    data={field}
                                    toggleMark={() => this.toggleMarkField(field)}
                                    leftMouseDown={() => this.handleLeftMouseDownOnField(field)}
                                    leftMouseUp={() => this.handleLeftMouseUpOnField(field)}
                                    mouseEnter={() => this.handleMouseEnterField(field)}
                                ></Field>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Minefield;
