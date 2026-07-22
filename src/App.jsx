import React from 'react';
import RemoteMount from './RemoteMount';

const loadAngular = () => import('angularRemote/Mount');
const loadVue = () => import('vueRemote/Mount');

export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ padding: '1rem', background: '#264653', color: '#fff' }}>
        <strong>Amor Lineribus</strong> - shell (React)
      </header>
      <main>
        <RemoteMount load={loadVue} />
        <RemoteMount load={loadAngular} />
      </main>
    </div>
  );
}