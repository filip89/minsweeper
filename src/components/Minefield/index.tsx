import React from 'react';
import './Minefield.scss';
import { Field as FieldModel } from '../../models/Field';
import Field from '../Field';
import { markFieldAction, pressFieldAction } from '../../game-reducer/actions';
import { GameContext } from '../../game-context';

export interface MinefieldProps {}

export interface MinefieldState {
    mouseDown: boolean;
}

class Minefield extends React.Component<MinefieldProps> {
    state: MinefieldState = {
        mouseDown: false,
    };

    static contextType = GameContext;
    context!: React.ContextType<typeof GameContext>;

    stopMouseEventPropagationIfDisabled = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        if (this.context.status === 'won' || this.context.status === 'lost') {
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
            this.context.dispatch(pressFieldAction(field));
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
                    {this.context.minefield.map((row, rowIndex) => (
                        <div className="minefield__row" key={rowIndex}>
                            {row.map((field) => (
                                <Field
                                    key={field.id}
                                    data={field}
                                    toggleMark={() => this.context.dispatch(markFieldAction(field))}
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
