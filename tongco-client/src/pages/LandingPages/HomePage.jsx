import Button from '../../components/Button';
import banner from '../../assets/img/cover.jpg';

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

                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-200">
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

                    <h2 className="mt-2 text-2xl font-semibold text-purple-900">
                        The fast track to sustainable gear.
                    </h2>

                </div>


                <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-3">

                    <div className="rounded-3xl border-2 border-purple-900 bg-purple-100 p-5">

                        <p className="text-2xl font-bold text-purple-900">
                            8
                        </p>

                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-500">
                            Core Athletic Apparel
                        </p>

                    </div>


                    <div className="rounded-3xl border-2 border-purple-900 bg-purple-100 p-5">

                        <p className="text-2xl font-bold text-purple-900">
                            4
                        </p>

                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-500">
                            Categories
                        </p>

                    </div>


                    <div className="rounded-3xl border-2 border-purple-900 bg-purple-100 p-5">

                        <p className="text-2xl font-bold text-purple-900">
                            10k+
                        </p>

                        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-500">
                            Happy Customers
                        </p>

                    </div>

                </div>
            </section>


            <section className="border-y-2 border-purple-900 bg-purple-50 px-4 py-10 sm:px-6 lg:px-8">

                <div className="mx-auto flex max-w-4xl flex-col items-center text-center">

                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-500">
                        Rushline Collection
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold text-purple-900">
                        Explore Our Products
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-purple-600">
                        Browse our available Nike, Adidas, Puma, and electronics products.
                    </p>

                    <Button
                        to="/products"
                        className="mt-6"
                        variant="primary"
                    >
                        Shop Now
                    </Button>

                </div>

            </section>

        </div>
    );
};

export default HomePage;