import { Outlet } from 'react-router-dom';
import Banner from '../assets/img/cover.jpg';

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-purple-100 text-purple-900">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
        <div className="flex items-center justify-center border-b-2 border-purple-300 bg-purple-200 p-8 sm:p-10 lg:border-b-0 lg:border-r-2 lg:border-purple-300 lg:p-16">
          <div className="flex w-full max-w-md items-center justify-center rounded-4xl border-2 border-dashed border-purple-300 bg-purple-100/60 p-8 sm:p-10">
            <img src={Banner} alt="Rushline Banner" className="w-full max-w-[35rem] aspect-square object-cover rounded-4xl" />
          </div>
        </div>

        <main className="flex items-center bg-purple-50 px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
