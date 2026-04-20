import Button from '../components/Button';
import backgroundImage from '../assets/img/background.jpg';

const NotFoundPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section 
        className="relative flex min-h-[700px] items-center justify-end border-y-2 border-purple-900 bg-cover bg-center px-2 py-16 sm:px-6 lg:px-8"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >


        <div className="relative z-10 max-w-3xl text-right">
          <p className="mb-3 text-lg font-semibold uppercase tracking-[0.28em] text-purple-500">
            Oops!
          </p>
          <h1 className="text-[50rem] font-bold leading-none text-purple-900 sm:text-[10rem]">
            404
          </h1>
          <p className="mt-4 text-lg leading-7 text-purple-600">
            Something's missing. 
          </p>
          <p className="mt-2 text-sm leading-4 text-purple-600">
            Page not found. The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-8 flex justify-end">
            <Button to="/">Go Home</Button>
          </div>
        </div>
      </section> 
    </div>
  );
};

export default NotFoundPage;
