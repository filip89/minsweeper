import './App.scss';
import * as React from 'react';
import GameBoard from '../GameBoard';
import GameSettings from '../GameSettings';
import { MinefieldSettings } from '../../models/MinefieldSettings';
import defaultSettings from '../GameSettings/DefaultSettings';
import createMinefield from '../../utilities/MinefieldBuilder';
import { Minefield } from '../../models/Minefield';

const App: React.FC = () => {
    const [minefield, setMinefield] = React.useState(createMinefield(defaultSettings));

    function handleSettingsApply(settings: MinefieldSettings): void {
        setMinefield(createMinefield(settings));
    }

    function handleMinefieldChange(minefield: Minefield): void {
        setMinefield(minefield);
    }

    return (
        <div>
            <GameSettings onApply={handleSettingsApply} />
            <GameBoard minefield={minefield} onMinefieldChange={handleMinefieldChange} />
        </div>
    );
};

export default App;
