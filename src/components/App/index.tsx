import React from 'react';
import './App.scss';
import { Minefield } from '../../models/Minefield';
import { Field as FieldModel } from '../../models/Field';
import Field from '../Field';
import defaultSettings from '../../DefaultSettings';
import createMinefield from '../../utilities/MinefieldBuilder';
import { tryToRevealField } from '../../utilities/MinefieldManager';

export interface AppProps {}

//TODO rename minefield to data and rename this component to Minefield
export interface AppState {
    minefield: Minefield;
    disabled: boolean;
}

class App extends React.Component<AppProps, AppState> {
    state: AppState = {
        minefield: createMinefield(defaultSettings),
        disabled: false,
    };

    toggleMarkField({ row, column }: FieldModel): void {
        let minefield = this.getMinefieldCopy();
        const copyField: FieldModel = minefield[row][column];
        copyField.marked = !copyField.marked;
        this.setState({ minefield: minefield });
    }

    onFieldRevealAttempt({ row, column }: FieldModel): void {
        let minefield = this.getMinefieldCopy();
        const copyField: FieldModel = minefield[row][column];
        const success: boolean = tryToRevealField(minefield, copyField);
        this.setState({
            minefield: minefield,
            disabled: !success,
        });
    }

    getMinefieldCopy(): Minefield {
        return JSON.parse(JSON.stringify(this.state.minefield));
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
            <div className="game">
                <header className="game__header"></header>
                <div
                    className="game__fields"
                    onMouseDownCapture={this.stopMouseEventPropagationIfDisabled}
                    onMouseUpCapture={this.stopMouseEventPropagationIfDisabled}
                    onContextMenuCapture={this.onContextMenu}
                >
                    {this.state.minefield.map((row, rowIndex) => (
                        <div className="game__row" key={rowIndex}>
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
            </div>
        );
    }
}

export default App;
