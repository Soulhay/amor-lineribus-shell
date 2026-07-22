import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import RemoteMount from './RemoteMount';
import Landing from './Landing';
import './styles/app.css';

// Loader functions are defined at module scope, not inside the component.
// RemoteMount keys its effect on `load`, so an inline arrow would create a
// new function every render and remount the remote on every re-render.
const loadVue = () => import('vueRemote/Mount');
const loadAngular = () => import('angularRemote/Mount');

export default function App() {
  return (
    <HashRouter>
      <div className="app">
        <header className="app__nav">
          <span className="app__brand">Amor Lineribus</span>
          <nav className="app__links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/lesson">Lesson</NavLink>
          </nav>
        </header>

        <main className="app__main">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<RemoteMount load={loadVue} />} />
            <Route path="/lesson" element={<RemoteMount load={loadAngular} />} />
          </Routes>
        </main>

        <footer className="app__footer">
          Amor Lineribus &middot; Alma Mater Europaea
        </footer>
      </div>
    </HashRouter>
  );
}