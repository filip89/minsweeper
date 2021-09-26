import './App.scss';
import React, { useReducer, useState } from 'react';
import GameBoard from '../GameBoard';
import GameSettings from '../GameSettings';
import { MinefieldSettings } from '../../models/MinefieldSettings';
import defaultSettings from '../GameSettings/DefaultSettings';
import createMinefield from '../../utilities/MinefieldBuilder';
import { gameReducer, GameState } from '../../game-reducer/reducer';
import { resetAction } from '../../game-reducer/actions';

const initialGameState: GameState = {
    minefield: createMinefield(defaultSettings),
    enabled: true,
    isPlaying: false,
    won: false,
};

const App: React.FC = () => {
    const [settings, setSettings] = useState(defaultSettings);
    const [{ minefield, enabled, isPlaying, won }, gameDispatch] = useReducer(gameReducer, initialGameState);

    function handleSettingsApply(settings: MinefieldSettings): void {
        setSettings(settings);
        gameDispatch(resetAction(settings));
    }

    function handleReset(): void {
        gameDispatch(resetAction(settings));
    }

    return (
        <div>
            <GameSettings onApply={handleSettingsApply} />
            <GameBoard
                onReset={handleReset}
                minefield={minefield}
                gameDispatch={gameDispatch}
                enabled={enabled}
                isPlaying={isPlaying}
                won={won}
                mineCount={settings.mines}
            />
        </div>
    );
};

export default App;
