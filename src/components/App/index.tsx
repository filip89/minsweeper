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
    const [isPlaying, setIsPlaying] = useState(false); //when first field marked or revealed until minfield reset

    function resetMinefield(settings: MinefieldSettings): void {
        setIsPlaying(false);
        if (!enabled) setEnabled(true);
        setMinefield(createMinefield(settings));
    }

    function handleSettingsApply(settings: MinefieldSettings): void {
        setSettings(settings);
        resetMinefield(settings);
    }

    function handleReset(): void {
        resetMinefield(settings);
    }

    function handleMinefieldChange(minefield: Minefield, mineDetonated: boolean = false): void {
        if (mineDetonated) {
            setEnabled(false);
        } else if (!isPlaying) setIsPlaying(true);
        setMinefield(minefield);
    }

    return (
        <div>
            <GameSettings onApply={handleSettingsApply} />
            <GameBoard
                onReset={handleReset}
                minefield={minefield}
                onMinefieldChange={handleMinefieldChange}
                enabled={enabled}
                isPlaying={isPlaying}
            />
        </div>
    );
};

export default App;
