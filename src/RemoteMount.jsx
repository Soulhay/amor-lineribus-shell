import React, { useEffect, useRef } from 'react';

/**
 * Framework-agnostic host for a federated remote.
 *
 * The shell never imports a remote's components directly - React cannot
 * render an Angular or Vue component. Instead every remote exposes the
 * same contract:
 *
 *   mount(element)   - bootstrap the remote into the given DOM element
 *   unmount()        - tear it down again
 *
 * This component owns an empty <div>, hands it to the remote on load,
 * and calls unmount() on cleanup. The same component works for every
 * framework, so the shell contains no framework-specific code.
 */
export default function RemoteMount({ load }) {
  const ref = useRef(null);

  useEffect(() => {
    let mod;
    let cancelled = false;

    load()
      .then((m) => {
        if (cancelled) return;
        mod = m;
        m.mount(ref.current);
      })
      .catch((err) => {
        console.error('Failed to load remote:', err);
      });

    return () => {
      cancelled = true;
      mod?.unmount?.();
    };
  }, [load]);

  return <div ref={ref} />;
}