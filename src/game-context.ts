import React from 'react';
import defaultSettings from './components/GameSettings/DefaultSettings';
import { GameAction } from './game-reducer/actions';
import { GameState } from './game-reducer/reducer';
import createMinefield from './utilities/MinefieldBuilder';

const initialGameState: GameState = {
    minefield: createMinefield(defaultSettings),
    enabled: true,
    isPlaying: false,
    won: false,
};

export type GameContextModel = GameState & { dispatch: React.Dispatch<GameAction> };

export const GameContext = React.createContext<GameContextModel>({
    ...initialGameState,
    dispatch: () => {},
});
