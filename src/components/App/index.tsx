import './App.scss';
import * as React from 'react';
import GameBoard from '../GameBoard';
import GameSettings from '../GameSettings';
import { MinefieldSettings } from '../../models/MinefieldSettings';
import defaultSettings from '../GameSettings/DefaultSettings';
import createMinefield from '../../utilities/MinefieldBuilder';
import { Minefield } from '../../models/Minefield';

const initialMinefield: Minefield = createMinefield(defaultSettings);

const App: React.FC = () => {
    const [minefield, setMinefield] = React.useState<Minefield>(initialMinefield);
    const [enabled, setEnabled] = React.useState<boolean>(true);

    function handleSettingsApply(settings: MinefieldSettings): void {
        setMinefield(createMinefield(settings));
        setEnabled(true);
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
                minefield={minefield}
                onMinefieldChange={handleMinefieldChange}
                enabled={enabled}
                onMineDetonated={handleMineDetonation}
            />
        </div>
    );
};

export default App;
