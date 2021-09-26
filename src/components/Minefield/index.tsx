import React from 'react';
import './Minefield.scss';
import { Minefield as MinefieldModel } from '../../models/Minefield';
import { Field as FieldModel } from '../../models/Field';
import Field from '../Field';
import { GameAction, markFieldAction, pressFieldAction } from '../../game-reducer/actions';

export interface MinefieldProps {
    minefield: MinefieldModel;
    enabled: boolean;
    gameDispatch: React.Dispatch<GameAction>,
}

export interface MinefieldState {
    mouseDown: boolean;
}

class Minefield extends React.Component<MinefieldProps> {
    state: MinefieldState = {
        mouseDown: false,
    };

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
        if (this.state.mouseDown) this.setState({ mouseDown: false });
    };

    onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        if (event.button === 0) this.setState({ mouseDown: true });
    };

    handleFieldLeftMouseUp(field: FieldModel): void {
        if (this.state.mouseDown && field.revealable) {
            this.props.gameDispatch(pressFieldAction(field))
        }
    }

    render() {
        return (
            <div
                className={'minefield' + (this.state.mouseDown ? ' minefield--pressed' : '')}
                onMouseDownCapture={this.stopMouseEventPropagationIfDisabled}
                onMouseUpCapture={this.stopMouseEventPropagationIfDisabled}
                onContextMenuCapture={this.onContextMenu}
                onMouseLeave={this.handleMouseLeave}
                onMouseUp={this.handleMouseUp}
                onMouseDown={this.onMouseDown}
            >
                <div>
                    {this.props.minefield.map((row, rowIndex) => (
                        <div className="minefield__row" key={rowIndex}>
                            {row.map((field) => (
                                <Field
                                    key={field.id}
                                    data={field}
                                    toggleMark={() => this.props.gameDispatch(markFieldAction(field))}
                                    leftMouseUp={() => this.handleFieldLeftMouseUp(field)}
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
