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
    const [enabled, setEnabled] = useState<boolean>(true); //disabled when game won or lost
    const [isPlaying, setIsPlaying] = useState(false); //when first field clicked - until reset
    const [won, setWon] = useState(false);

    function resetMinefield(settings: MinefieldSettings): void {
        setIsPlaying(false);
        setWon(false);
        setEnabled(true);
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
        if (noMinesLeft(minefield)) {
            setEnabled(false);
            setWon(true);
        } else if (mineDetonated) {
            setEnabled(false);
        } else if (!isPlaying) {
            setIsPlaying(true);
        }
        setMinefield(minefield);
    }

    function noMinesLeft(minefield: Minefield): boolean {
        return !minefield.some((row) => row.some((field) => !field.hasMine && !field.revealed));
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
                won={won}
                mineCount={settings.mines}
            />
        </div>
    );
};

export default App;
