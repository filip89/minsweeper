import * as React from 'react';
import { useForm } from 'react-hook-form';
import './GameSettings.scss';
import './DefaultSettings';
import defaultSettings from './DefaultSettings';
import { MinefieldSettings } from '../../models/MinefieldSettings';

export interface GameSettingsProps {
    onApply: (settings: MinefieldSettings) => void;
}

const GameSettings: React.FC<GameSettingsProps> = ({ onApply }) => {
    const { register, handleSubmit, setValue } = useForm();

    function onSubmit(settings: MinefieldSettings): void {
        settings.rows = getAdjustedAxisLength(settings.rows);
        settings.columns = getAdjustedAxisLength(settings.columns);
        settings.mines = getAdjustedMineCount(settings);
        setValue('rows', settings.rows);
        setValue('columns', settings.columns);
        setValue('mines', settings.mines);
        onApply(settings);
    }

    function getAdjustedAxisLength(length: number): number {
        if (length > 99) {
            return 99;
        } else if (length < 0) {
            return 1;
        }
        return length;
    }

    function getAdjustedMineCount({ rows, columns, mines }: MinefieldSettings): number {
        const fieldsCount = rows * columns;
        if (mines >= fieldsCount) {
            return fieldsCount - 1;
        } else if (mines < 1) {
            return 1;
        }
        return mines;
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
