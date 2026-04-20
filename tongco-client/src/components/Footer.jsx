import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="border-t-2 border-purple-900 bg-purple-900 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-purple-50 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-bold">Rushline Apparel</p>
          <p className="mt-1 text-sm text-purple-300">Sustainable performance, one stride at a time.</p>
        </div>
        <nav className="flex flex-col gap-2 sm:flex-row sm:gap-6">
          <NavLink to="/products" className="text-sm text-purple-300 hover:text-purple-100 transition-colors">
            Products
          </NavLink>
          <NavLink to="/about" className="text-sm text-purple-300 hover:text-purple-100 transition-colors">
            About
          </NavLink>
          <NavLink to="/auth/signin" className="text-sm text-purple-300 hover:text-purple-100 transition-colors">
            Sign In
          </NavLink>
          <NavLink to="/auth/signup" className="text-sm text-purple-300 hover:text-purple-100 transition-colors">
            Sign Up
          </NavLink>
        </nav>
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-400">
          © 2026 RushlineApparel. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
