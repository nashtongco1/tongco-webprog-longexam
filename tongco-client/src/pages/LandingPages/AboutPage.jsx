import Button from '../../components/Button';
import logo from '../../assets/img/cover.jpg';
import nikeImage from '../../assets/img/nike.jpg';
import adidasImage from '../../assets/img/adidas.jpg';
import pumaImage from '../../assets/img/puma.jpg';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border-2 border-dashed border-purple-300 bg-purple-100 p-4 sm:p-6">
            <div className="relative flex min-h-72 w-full items-center justify-center overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-purple-200 via-purple-100 to-purple-200 p-6">

              {/* soft glow background effect */}
              <div className="absolute inset-0 opacity-30 blur-2xl bg-purple-300"></div>

              {/* animated logo wrapper */}
              <div className="relative flex h-full w-full items-center justify-center">
                <img
                  src={logo}
                  alt="RushlineApparel"
                  className="h-full max-h-300 w-full max-w-300 object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
                />
              </div>

            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-500">
              Our Mission
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-purple-900 sm:text-4xl">
              Elite sustainable gear. Pro-grade performance for every athlete.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-purple-600 sm:text-base">
              Rushline Apparel is engineered for the elite. We deliver high-velocity, eco-friendly gear that cuts environmental impact without sacrificing speed or style. Performance for the planet. Precision for the athlete.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>
              <Button to="/products">Shop Products</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-500">
            Store Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-purple-900">The fast track to sustainable gear</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-3">
          <div className="rounded-3xl border-2 border-purple-900 bg-purple-100 p-5">
            <p className="text-2xl font-bold text-purple-900">8</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-500">
              Eco Products
            </p>
          </div>
          <div className="rounded-3xl border-2 border-purple-900 bg-purple-100 p-5">
            <p className="text-2xl font-bold text-purple-900">3</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-500">
              Categories
            </p>
          </div>
          <div className="rounded-3xl border-2 border-purple-900 bg-purple-100 p-5">
            <p className="text-2xl font-bold text-purple-900">10k+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-500">
              Happy Customers
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-500">
              Our Approach
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-purple-900">Frictionless gear. Zero-waste shopping.</h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-purple-900 bg-purple-100 p-5">
                <h3 className="text-lg font-semibold text-purple-900">Elite Curation</h3>
                <p className="mt-3 text-sm leading-6 text-purple-600">
                  Precision-engineered gear sourced from the world’s most innovative circular labs.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-purple-900 bg-purple-100 p-5">
                <h3 className="text-lg font-semibold text-purple-900">Battle-Tested Quality</h3>
                <p className="mt-3 text-sm leading-6 text-purple-600">
                  Durability without compromise. Every kit is stress-tested for peak performance and zero-waste longevity.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-purple-900 bg-purple-100 p-5">
                <h3 className="text-lg font-semibold text-purple-900">The Collective Mission</h3>
                <p className="mt-3 text-sm leading-6 text-purple-600">
                  Beyond the finish line. We’re fueling environmental restoration and training the next generation of conscious athletes.
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-purple-900 bg-purple-100 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-500">
              Product Categories
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-[1.25rem] bg-purple-200">
                <img src={nikeImage} alt="Nike" className="h-full w-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-[1.25rem] bg-purple-200">
                <img src={adidasImage} alt="Adidas" className="h-full w-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-[1.25rem] bg-purple-200">
                <img src={pumaImage} alt="Puma" className="h-full w-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-[1.25rem] bg-purple-200">
                <img src={logo} alt="Rushline Apparel" className="h-full w-full object-cover" />
              </div>
            </div>
            <Button to="/products" className="mt-5">View Products</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
