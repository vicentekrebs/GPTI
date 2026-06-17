import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const RouterContext = createContext(null);

const normalize = (path) => (path.length > 1 ? path.replace(/\/$/, '') : path);

export function BrowserRouter({ children }) {
  const [location, setLocation] = useState(() => window.location.pathname || '/');

  useEffect(() => {
    const onPopState = () => setLocation(window.location.pathname || '/');
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (to, { replace = false } = {}) => {
    if (replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }
    setLocation(window.location.pathname || '/');
  };

  const value = useMemo(() => ({ location: normalize(location), navigate }), [location]);
  return React.createElement(RouterContext.Provider, { value }, children);
}

export function NavLink({ to, className = '', children, ...props }) {
  const router = useContext(RouterContext);
  const isActive = router?.location === normalize(to);
  const resolvedClassName = typeof className === 'function' ? className({ isActive }) : `${className}${isActive ? ' active' : ''}`.trim();

  return React.createElement('a', {
    ...props,
    href: to,
    className: resolvedClassName,
    onClick: (event) => {
      props.onClick?.(event);
      if (!event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
        event.preventDefault();
        router?.navigate(to);
      }
    },
  }, children);
}

export function Routes({ children }) {
  const router = useContext(RouterContext);
  const routes = React.Children.toArray(children);
  const currentPath = router?.location ?? '/';
  const match = routes.find((route) => route.props.path === currentPath) ?? routes.find((route) => route.props.path === '*');
  return match ? match.props.element : null;
}

export function Route() {
  return null;
}

export function Navigate({ to, replace = false }) {
  const router = useContext(RouterContext);
  useEffect(() => {
    router?.navigate(to, { replace });
  }, [router, replace, to]);
  return null;
}
