import './App.scss';
import React, { useState } from 'react';
import GameBoard from '../GameBoard';
import GameSettings from '../GameSettings';
import { MinefieldSettings } from '../../models/MinefieldSettings';
import defaultSettings from '../GameSettings/DefaultSettings';
import createMinefield from '../../utilities/MinefieldBuilder';
import { Minefield } from '../../models/Minefield';

const initialMinefield: Minefield = createMinefield(defaultSettings);

const App: React.FC = () => {
    const [settings, setSettings] = useState(defaultSettings);
    const [minefield, setMinefield] = useState<Minefield>(initialMinefield);
    const [enabled, setEnabled] = useState<boolean>(true);

    function resetMinefield(settings: MinefieldSettings): void {
        setMinefield(createMinefield(settings));
        if (!enabled) setEnabled(true);
    }

    function handleSettingsApply(settings: MinefieldSettings): void {
        setSettings(settings);
        resetMinefield(settings);
    }

    function handleReset(): void {
        resetMinefield(settings);
    }

    function handleMinefieldChange(minefield: Minefield): void {
        setMinefield(minefield);
    }

    function handleMineDetonation(): void {
        setEnabled(false);
    }

    return (
        <div>
            <GameSettings onApply={handleSettingsApply} />
            <GameBoard
                onReset={handleReset}
                minefield={minefield}
                onMinefieldChange={handleMinefieldChange}
                enabled={enabled}
                onMineDetonated={handleMineDetonation}
            />
        </div>
    );
};

export default App;
