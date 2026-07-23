import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import RemoteMount from './RemoteMount';
import Landing from './Landing';
import './styles/tokens.css';
import './styles/app.css';
import './styles/landing.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const loadVue = () => import('vueRemote/Mount');
const loadAngular = () => import('angularRemote/Mount');

/**
 * Bridges navigation requests from remotes to the shell's router.
 *
 * A remote cannot import the shell's router without depending on the host,
 * which would defeat independent deployment. It announces intent on a
 * custom DOM event instead and the shell decides what to do with it — the
 * remote stays unaware of how routing is implemented, or whether a shell
 * is present at all.
 */

function RemoteNavigationBridge() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      const to = e.detail?.to;
      if (typeof to === 'string') navigate(to);
    };

    window.addEventListener('amor:navigate', handler);
    return () => window.removeEventListener('amor:navigate', handler);
  }, [navigate]);

  return null;
}

export default function App() {
  return (
    <HashRouter>
      <RemoteNavigationBridge />
      <div className="app">
        <header className="app__nav">
          <NavLink to="/" className="app__brand">
            Amor Lineribus <span className="app__brand-slash">/learn</span>
          </NavLink>

          <nav className="app__links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/course">Courses</NavLink>
            <NavLink to="/lesson">Lesson</NavLink>
          </nav>

          <NavLink to="/course" className="btn btn--primary btn--sm">
            Start learning
          </NavLink>
        </header>

        <main className="app__main">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/course" element={<RemoteMount load={loadVue} />} />
            <Route path="/lesson" element={<RemoteMount load={loadAngular} />} />
          </Routes>
        </main>

        <footer className="app__footer">
          <div className="app__footer-inner">
            <div className="app__footer-brand">
              <strong>Amor Lineribus</strong>
              <p>A modular, multi-framework platform for learning modern web development.</p>
            </div>

            <div className="app__footer-col">
              <p className="app__footer-head">Platform</p>
              <ul><li>Courses</li><li>Frameworks</li><li>Roadmap</li></ul>
            </div>

            <div className="app__footer-col">
              <p className="app__footer-head">Resources</p>
              <ul><li>Docs</li><li>Blog</li><li>Support</li></ul>
            </div>

            <div className="app__footer-col">
              <p className="app__footer-head">About</p>
              <ul><li>Alma Mater Europaea</li><li>Diploma project</li><li>Contact</li></ul>
            </div>
          </div>

          <p className="app__footer-legal">
            © 2026 Amor Lineribus · Alma Mater Europaea
          </p>
        </footer>
      </div>
    </HashRouter>
  );
}