import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/img/cover.jpg';

const publicLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/products' },
];

const customerLinks = [
  { label: 'Cart', to: '/cart' },
  { label: 'Orders', to: '/orders' },
];

const adminLinks = [
  { label: 'Admin', to: '/admin' },
];

const authLinks = [
  { label: 'Sign In', to: '/auth/signin' },
  { label: 'Sign Up', to: '/auth/signup' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
    isActive
      ? 'border-purple-900 bg-purple-900 text-purple-50'
      : 'border-transparent text-purple-500 hover:border-purple-900 hover:bg-purple-50 hover:text-purple-900',
  ].join(' ');

const authLinkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
    isActive
      ? 'border-purple-900 bg-purple-900 text-purple-50'
      : 'border-purple-900 bg-purple-50 text-purple-900 hover:bg-purple-900 hover:text-purple-50',
  ].join(' ');

const NavBar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/auth/signin');

    window.location.reload();
  };

  let roleLinks = [];

  if (user?.role === 'customer') {
    roleLinks = customerLinks;
  }

  if (user?.role === 'admin') {
    roleLinks = adminLinks;
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-purple-900 bg-purple-100/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

        <NavLink
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src={logo}
            alt="EcoEssentials"
            className="h-9 w-9 rounded-full border-2 border-purple-900 bg-purple-50 object-contain"
          />

          <div className="space-y-0.5">
            <p className="text-xl font-bold text-purple-900">
              Rushline Apparel
            </p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">

          {publicLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}

          {token &&
            roleLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={navLinkClassName}
              >
                {link.label}
              </NavLink>
            ))}

        </nav>

        <nav className="hidden items-center gap-2 md:flex">

          {!token || !user ? (
            authLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={authLinkClassName}
              >
                {link.label}
              </NavLink>
            ))
          ) : (
            <>
              <NavLink
                to="/profile"
                className={authLinkClassName}
              >
                Profile
              </NavLink>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border-2 border-purple-900 bg-purple-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-900 transition hover:bg-purple-900 hover:text-purple-50"
              >
                Logout
              </button>
            </>
          )}

        </nav>

      </div>
    </header>
  );
};

export default NavBar;