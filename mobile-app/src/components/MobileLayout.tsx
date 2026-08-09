import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';

/**
 * Shared app shell — always renders the bottom navigation bar.
 * Hides the nav on sub-pages like /day/:day that have their own bottom CTA.
 */
export default function MobileLayout() {
  const { pathname } = useLocation();
  const hideNav = pathname.startsWith('/day/');

  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
