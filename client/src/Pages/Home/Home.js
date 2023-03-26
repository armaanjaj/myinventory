import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navigation from "../../Components/Navigation/Navigation";
// import ScrollArrow from "../../Components/ScrollArrow/ScrollArrow";

function Home() {
    return (
        <>
            <Navigation />
            {/* <div id="scrollArrowDiv" className="p-[1rem] border-[0.5px] border-solid border-white bg-[#0280708a] backdrop-blur-[5px] text-white rounded-[50%] absolute float-right right-[2rem] bottom-[2rem] transition-[0.5s]">
                <ScrollArrow />
            </div> */}
            <div>
                <div className="pt-[5vh]">
                    <section className="py-40 bg-[#00b2c930]">
                        <div className="container mx-auto flex flex-col items-center justify-center">
                            <h1 className="text-5xl font-bold text-gray-800 text-center mb-8">
                                Manage your inventory with ease
                            </h1>

                            <p className="text-lg text-gray-600 text-center mb-12">
                                Say goodbye to the hassle of tracking your home
                                or office items manually. Our inventory
                                management website makes it simple and
                                stress-free.
                            </p>

                            <Link
                                to={"/auth/signup"}
                                className="bg-[#028090] hover:bg-[#0a5761] text-white text-lg font-medium py-4 px-8 rounded-full transition-all duration-300"
                            >
                                Sign up now
                            </Link>
                        </div>
                    </section>

                    {/* <!-- Features section --> */}

                    <section id="features-section" className="py-16 px-8">
                        <div className="container mx-auto">
                            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
                                Features
                            </h2>

                            <div className="flex flex-col md:flex-row md:justify-between">
                                <div className="flex-1 px-4">
                                    <h3 className="text-2xl font-medium text-gray-800 mb-4">
                                        Track your items easily
                                    </h3>

                                    <p className="text-lg text-gray-600">
                                        Add items to your inventory and manage
                                        them with just a few clicks. Our simple
                                        interface makes it easy to find what you
                                        need, when you need it.
                                    </p>
                                </div>

                                <div className="flex-1 px-4 mt-8 md:mt-0">
                                    <h3 className="text-2xl font-medium text-gray-800 mb-4">
                                        Get alerts for low stock
                                    </h3>

                                    <p className="text-lg text-gray-600">
                                        Our inventory management website keeps
                                        track of stock levels and sends you
                                        alerts when items are running low. Never
                                        run out of supplies again!
                                    </p>
                                </div>

                                <div className="flex-1 px-4 mt-8 md:mt-0">
                                    <h3 className="text-2xl font-medium text-gray-800 mb-4">
                                        Collaborate with your team
                                    </h3>

                                    <p className="text-lg text-gray-600">
                                        Invite your team members to collaborate
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* <!-- Testimonials section --> */}

                    <section
                        className="py-16 bg-gray-50"
                        style={{ display: "none" }}
                    >
                        <div className="container mx-auto">
                            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
                                What our customers say
                            </h2>

                            <div className="flex flex-col md:flex-row md:justify-between">
                                <div className="flex-1 px-4">
                                    <div className="bg-white rounded-lg shadow-lg px-8 py-10 mb-8">
                                        <p className="text-lg text-gray-600 mb-6">
                                            "I can't believe how much time this
                                            inventory management website has
                                            saved me. I used to have to manually
                                            track everything, but now I can do
                                            it all in one place. It's been a
                                            game changer!"
                                        </p>
                                        <p className="text-lg text-gray-800 font-medium">
                                            - Sarah T.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex-1 px-4 mt-8 md:mt-0">
                                    <div className="bg-white rounded-lg shadow-lg px-8 py-10 mb-8">
                                        <p className="text-lg text-gray-600 mb-6">
                                            "I love how easy it is to
                                            collaborate with my team on this
                                            inventory management website. We can
                                            all stay on the same page and make
                                            sure we have the supplies we need to
                                            get our work done."
                                        </p>

                                        <p className="text-lg text-gray-800 font-medium">
                                            - John D.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <!-- Call to action section --> */}

                    <section className="py-16 bg-[#028090]">
                        <div className="container mx-auto flex flex-col items-center justify-center">
                            <h2 className="text-3xl font-bold text-white text-center mb-8">
                                Ready to get started?
                            </h2>

                            <p className="text-lg text-white text-center mb-12">
                                Sign up for our inventory management website
                                today and start managing your items with ease.
                            </p>

                            <Link
                                to={"/auth/signup"}
                                className="bg-white hover:bg-gray-200 text-[#028090] text-lg font-medium py-4 px-8 rounded-full transition-all duration-300"
                            >
                                Sign up now
                            </Link>
                        </div>
                    </section>
                </div>
            </div>

            {/* Footer Section */}
            <Footer />
        </>
    );
}

export default Home;
