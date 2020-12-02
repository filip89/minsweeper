import './App.scss';
import * as React from 'react';
import GameBoard from '../GameBoard';
import GameSettings from '../GameSettings';
import { MinefieldSettings } from '../../models/MinefieldSettings';
import defaultSettings from '../GameSettings/DefaultSettings';

const App: React.FC = () => {
    const [settings, setSettings] = React.useState<MinefieldSettings>(defaultSettings);

    return (
        <div>
            <GameSettings onApply={setSettings} />
            <GameBoard />
        </div>
    );
};

export default App;
