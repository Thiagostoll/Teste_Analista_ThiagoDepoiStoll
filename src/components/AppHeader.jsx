import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, UserX, Database } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Gestor de Vendas', icon: ShoppingCart },
  { to: '/inativos', label: 'Clientes Inativos', icon: UserX },
  { to: '/sql', label: 'Consultas SQL', icon: Database },
];

export default function AppHeader({ children }) {
  const location = useLocation();

  return (
    <>
      {/* Faixa borgonha superior — idêntica à do site Pirahy */}
      <div className="h-1.5 w-full bg-[#6B1A1A]" />

      <header className="border-b border-border bg-white sticky top-0 z-30 shadow-sm">
        {/* Linha do logo */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Logo Pirahy */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex flex-col leading-none select-none">
              <span
                className="text-2xl font-extrabold tracking-wider"
                style={{ color: '#C9A84C', fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em' }}
              >
                PIRAHY
              </span>
              <span
                className="text-[10px] font-semibold tracking-[0.3em] uppercase"
                style={{ color: '#6B1A1A' }}
              >
                ALIMENTOS
              </span>
            </div>
            <div className="w-px h-8 bg-border mx-1 hidden sm:block" />
            <span className="hidden sm:block text-xs text-muted-foreground font-medium leading-tight">
              Gestor de<br />Vendas
            </span>
          </Link>

          {/* Navegação */}
          <nav className="flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${active
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Slot para conteúdo extra (ex: subtítulo por página) */}
        {children && (
          <div className="border-t border-border/50 bg-muted/30">
            {children}
          </div>
        )}
      </header>
    </>
  );
}