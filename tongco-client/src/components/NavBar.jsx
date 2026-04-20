import { NavLink } from 'react-router-dom';
import logo from '../assets/img/cover.jpg';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Products', to: '/products' },
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
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-purple-900 bg-purple-100/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="EcoEssentials" className="h-9 w-9 rounded-full border-2 border-purple-900 bg-purple-50 object-contain" />
          <div className="space-y-0.5">
            <p className="text-xl font-bold text-purple-900">Rushline Apparel</p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClassName}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <nav className="hidden items-center gap-2 md:flex">
          {authLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={authLinkClassName}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
