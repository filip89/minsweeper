import * as React from 'react';
import { useForm } from 'react-hook-form';
import './GameSettings.scss';
import './DefaultSettings';
import defaultSettings from './DefaultSettings';
import { MinefieldSettings } from '../../models/MinefieldSettings';
import { getInRange, Range } from '../../utilities/getInRange';

const columnsRange: Range = { min: 2, max: 50 };
const rowsRange: Range = { min: 2, max: 30 };
const minMines = 1;

export interface GameSettingsProps {
    onApply: (settings: MinefieldSettings) => void;
}

const GameSettings: React.FC<GameSettingsProps> = ({ onApply }) => {
    const { register, handleSubmit, setValue } = useForm();

    function onSubmit(settings: MinefieldSettings): void {
        settings.rows = getInRange(settings.rows, rowsRange);
        settings.columns = getInRange(settings.columns, columnsRange);
        settings.mines = getInRange(settings.mines, { min: minMines, max: settings.rows * settings.columns - 1 });
        setValue('rows', settings.rows);
        setValue('columns', settings.columns);
        setValue('mines', settings.mines);
        onApply(settings);
    }

    return (
        <div className="game-settings">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    Rows: <input type="number" name="rows" defaultValue={defaultSettings.rows} ref={register}></input>
                </div>
                <div>
                    Columns:{' '}
                    <input type="number" name="columns" defaultValue={defaultSettings.columns} ref={register}></input>
                </div>
                <div>
                    Mines:{' '}
                    <input type="number" name="mines" defaultValue={defaultSettings.mines} ref={register}></input>
                </div>
                <button>Apply</button>
            </form>
        </div>
    );
};

export default GameSettings;
