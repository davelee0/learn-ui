import { NavLink, Outlet } from 'react-router-dom';
import { Home, Grid3X3, BarChart3 } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/catalog', icon: Grid3X3, label: 'Catalog' },
  { to: '/progress', icon: BarChart3, label: 'Progress' },
];

export function AppLayout() {
  return (
    <div className="min-h-screen bg-white flex">
      <aside className="w-52 bg-zinc-50 fixed h-screen flex flex-col shadow-[1px_0_3px_rgba(0,0,0,0.04)]">
        <div className="px-5 py-4 border-b border-zinc-200">
          <NavLink to="/" className="font-mono font-medium text-base tracking-tight text-zinc-900">
            UI Learn
          </NavLink>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-1.5 rounded-sm text-sm transition-colors ${
                  isActive
                    ? 'bg-amber-50 text-amber-800'
                    : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800'
                }`
              }
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-3 border-t border-zinc-200 text-[11px] text-zinc-400">
          Based on component.gallery
        </div>
      </aside>
      <main className="flex-1 ml-52">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
