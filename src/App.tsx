import React from 'react';
import './App.scss';
import { Minefield } from './models/Minefield';
import { Field as FieldModel } from './models/Field';
import Field from './Field';
import createMinefield, { getAdjacentFields } from './MinefieldBuilder';
import defaultSettings from './DefaultSettings';

export interface AppProps {}

//TODO rename minefield to data and rename this component to Minefield
export interface AppState {
    minefield: Minefield;
    minefieldDisabled: boolean;
}

class App extends React.Component<AppProps, AppState> {
    minefield: Minefield = [];

    state: AppState = {
        minefield: createMinefield(defaultSettings),
        minefieldDisabled: false,
    };

    toggleMarkField(field: FieldModel): void {
        this.minefield = this.getMinefieldCopy();
        const copyField: FieldModel = this.minefield[field.row][field.column];
        copyField.marked = !copyField.marked;
        this.setState({ minefield: this.minefield });
    }

    onUserReveal(field: FieldModel): void {
        this.minefield = this.getMinefieldCopy();
        const copiedField: FieldModel = this.minefield[field.row][field.column];
        if (copiedField.hasMine) {
            copiedField.detonated = true;
            this.revealUnmarkedMines();
            this.revealWronglyMarkedFields();
            this.setState({
                minefield: this.minefield,
                minefieldDisabled: true,
            });
        } else {
            this.revealField(copiedField);
            this.setState({ minefield: this.minefield });
        }
    }

    revealUnmarkedMines(): void {
        this.minefield.forEach((row) => {
            row.forEach((field) => {
                if (field.hasMine && !field.marked) {
                    field.revealed = true;
                }
            });
        });
    }

    revealWronglyMarkedFields(): void {
        this.minefield.forEach((row) => {
            row.forEach((field) => {
                if (field.marked && !field.hasMine) {
                    field.revealed = true;
                }
            });
        });
    }

    revealField(field: FieldModel): void {
        field.revealed = true;
        if (!field.adjacentMines) {
            this.revealAdjacentFields(field);
        }
    }

    revealAdjacentFields(field: FieldModel): void {
        const adjacentFields: FieldModel[] = getAdjacentFields(this.minefield, field);
        adjacentFields.forEach((adjacentField) => {
            if (!adjacentField.revealed && !adjacentField.marked) {
                this.revealField(adjacentField);
            }
        });
    }

    getMinefieldCopy(): Minefield {
        return JSON.parse(JSON.stringify(this.state.minefield));
    }

    render() {
        return (
            <div className="game">
                <header className="game__header"></header>
                <div className="game__fields">
                    {this.state.minefield.map((row, rowIndex) => (
                        <div className="game__row" key={rowIndex}>
                            {row.map((field) => (
                                <Field
                                    key={field.id}
                                    disabled={this.state.minefieldDisabled}
                                    data={field}
                                    toggleMark={() => this.toggleMarkField(field)}
                                    reveal={() => this.onUserReveal(field)}
                                ></Field>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
