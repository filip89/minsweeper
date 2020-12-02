import * as React from 'react';

export interface GameStatusProps {}

const GameStatus: React.FC<GameStatusProps> = () => {
    return <header className="game-board__status"></header>;
};

export default GameStatus;
