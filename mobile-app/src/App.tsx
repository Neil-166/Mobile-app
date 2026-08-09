import { useCallback, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import SplashLoader from './components/SplashLoader';
import MobileLayout from './components/MobileLayout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import DayChallenge from './pages/DayChallenge';
import Profile from './pages/Profile';

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashComplete = useCallback(() => setSplashDone(true), []);
  const location = useLocation();

  return (
    <>
      {!splashDone && <SplashLoader onComplete={handleSplashComplete} />}
      <Routes location={location}>
        <Route element={<MobileLayout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/day/:day" element={<DayChallenge />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </>
  );
}
