import React from 'react';
import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import ProducerDashboard from './components/ProducerDashboard';
import PlayerPortal from './components/PlayerPortal';
import DeckBuilder from './components/DeckBuilder';
import GameDashboard from './components/GameDashboard';

function PlayerPortalWithParams() {
  const [params] = useSearchParams();
  const gameId = params.get('gameId');
  const playerEmail = params.get('email');

  return <PlayerPortal gameId={gameId} playerEmail={playerEmail} />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProducerDashboard />} />
        <Route path="/player" element={<PlayerPortalWithParams />} />
        <Route path="/deck" element={<DeckBuilder />} />
        <Route path="/game" element={<GameDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;