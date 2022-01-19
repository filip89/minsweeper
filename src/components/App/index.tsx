import './App.scss';
import React, { useReducer, useState } from 'react';
import GameBoard from '../GameBoard';
import GameSettings from '../GameSettings';
import { MinefieldSettings } from '../../models/MinefieldSettings';
import defaultSettings from '../GameSettings/DefaultSettings';
import createMinefield from '../../utilities/MinefieldBuilder';
import { gameReducer, GameState } from '../../game-reducer/reducer';
import { resetAction } from '../../game-reducer/actions';
import { GameContext } from '../../game-context';

const initialGameState: GameState = {
    minefield: createMinefield(defaultSettings),
    status: 'pristine'
};

const App: React.FC = () => {
    const [settings, setSettings] = useState(defaultSettings);
    const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

    function handleSettingsApply(settings: MinefieldSettings): void {
        setSettings(settings);
        dispatch(resetAction(settings));
    }

    function handleReset(): void {
        dispatch(resetAction(settings));
    }

    return (
        <div>
            <GameSettings onApply={handleSettingsApply} />
            <GameContext.Provider value={{ ...gameState, dispatch }}>
                <GameBoard onReset={handleReset} mineCount={settings.mines} />
            </GameContext.Provider>
        </div>
    );
};

export default App;
