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
          {/* `/` is the landing page — judged first at 390px */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/day/:day" element={<DayChallenge />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}
