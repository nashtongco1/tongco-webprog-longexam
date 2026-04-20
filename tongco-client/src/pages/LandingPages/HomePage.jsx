import Button from '../../components/Button';
import banner from '../../assets/img/cover.jpg';
import nikeImage from '../../assets/img/nike.jpg';
import adidasImage from '../../assets/img/adidas.jpg';
import pumaImage from '../../assets/img/puma.jpg';

const HomePage = () => {
    return (
        <div className="flex w-full flex-col gap-6">
            <section className="relative min-h-[28rem] overflow-hidden border-y-2 border-purple-900 bg-purple-900 px-4 py-10 sm:px-6 lg:px-8">
                <img
                    src={banner}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-purple-900/45" />

                <div className="relative z-10 flex min-h-[22rem] items-start justify-end text-right sm:min-h-[24rem]">
                    <div className="max-w-xl">
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-purple    -200">
                            Circular Athleticism Marketplace
                        </p>
                        <h1 className="text-3xl font-bold leading-tight text-purple-50 sm:text-2xl">
                            Welcome to Rushline Apparel Store
                        </h1>
                        <p className="mt-4 text-sm leading-7 text-purple-100 sm:text-base">
                            Gear for the rush. Crafted for the earth. Where elite performance meets conscious design.
                        </p>

                        <div className="mt-6 flex flex-wrap justify-end gap-3">
                            <Button to="/products">
                                Shop Now
                            </Button>
                            <Button to="/about" variant="primary">
                                 Mission
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-500">
                        Store Overview
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-purple-900">The fast track to sustainable gear.</h2>
                </div>

                <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-3">
                    <div className="rounded-3xl border-2 border-purple-900 bg-purple-100 p-5">
                        <p className="text-2xl font-bold text-purple-900">8</p>
                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-500">
                            Core Athletic Apparel
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
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-500">
                        Shop Categories
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-purple-900">The Rushline Sustainable Starter Kit</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <article className="rounded-3xl border-2 border-purple-900 bg-purple-100 p-4">
                        <div className="overflow-hidden rounded-[1.25rem] bg-purple-200">
                            <img src={nikeImage} alt="Nike" className="h-full w-full object-cover" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-purple-900">Nike</h3>
                        <p className="mt-3 text-sm leading-6 text-purple-600">
                            Circular kits, recycled race-wear, and carbon-neutral performance gear.
                        </p>
                        <Button to="/products" className="mt-4" variant="primary">Shop Now</Button>
                    </article>

                    <article className="rounded-3xl border-2 border-purple-900 bg-purple-100 p-4">
                        <div className="overflow-hidden rounded-[1.25rem] bg-purple-200">
                            <img src={adidasImage} alt="Adidas" className="h-full w-full object-cover" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-purple-900">Adidas</h3>
                        <p className="mt-3 text-sm leading-6 text-purple-600">
                            Parley Ocean Plastic uniforms, Primegreen performance kits, and circular training essentials.
                        </p>
                        <Button to="/products" className="mt-4" variant="primary">Shop Now</Button>
                    </article>

                    <article className="rounded-3xl border-2 border-purple-900 bg-purple-100 p-4">
                        <div className="overflow-hidden rounded-[1.25rem] bg-purple-200">
                            <img src={pumaImage} alt="Puma" className="h-full w-full object-cover" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-purple-900">Puma</h3>
                        <p className="mt-3 text-sm leading-6 text-purple-600">
                            Recycled pitch-wear, bio-based track gear, and Forever Better speed essentials..
                        </p>
                        <Button to="/products" className="mt-4" variant="primary">
                            Shop Now
                        </Button>
                    </article>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
