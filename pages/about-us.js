import Head from "next/head";
import ListingLayout from "../components/layout/ListingLayout";

export default function AboutUs() {
    return (
        <ListingLayout>
            <Head>
                <title>About Us</title>
                <meta property="og:title" content="About Us" key="about-us" />
            </Head>
            <div className="page-title mt-10 pt-10 pb-10">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-5">
                            <h1>About Us</h1>
                        </div>
                        <div className="col-md-12">
                            <p>
                                Welcome to StartXV, the premier online platform connecting startups and investors from all over the world. Our mission
                                is to empower startups of all industries and stages to achieve their full potential by connecting them with the
                                resources and networks they need to succeed.
                            </p>

                            <p>
                                Our platform is designed to provide startups with a wide range of networking opportunities, including access to
                                potential investors, strategic collaborators, mentors, incubation and acceleration programs, and corporate credits for
                                accelerating growth. We understand the unique challenges and opportunities that startups face, and our platform is
                                tailored to meet those needs.
                            </p>

                            <p>
                                We believe that startups are the backbone of the global economy and it is our goal to help them succeed. We are
                                constantly working on new ways to support and assist startups in their growth journey. StartXV is dedicated to helping
                                startups in all categories, including technology, e-commerce, healthcare, fintech, renewable energy, AI, and more. Our
                                platform is designed to be user-friendly and easy to navigate, making it easy for startups to connect with the right
                                investors, mentors, and partners.
                            </p>

                            <p>
                                Investors also stand to benefit from our platform. Our advanced filtering and search capabilities allow investors to
                                easily find and connect with startups that align with their investment preferences and strategies. Additionally, our
                                platform offers a wide range of investment opportunities, from seed funding to later stage investments, and everything
                                in between.
                            </p>

                            <p>
                                We are committed to constantly innovating and improving our platform to better serve our users. Whether you are a
                                startup founder looking for funding and mentorship, or an investor searching for the next big thing, StartXV is the
                                place to be. Join us today and start building the future of business together.
                            </p>

                            <p>We welcome your feedback and suggestions on how we can continue to help startups succeed.</p>
                        </div>
                    </div>
                </div>
            </div>
        </ListingLayout>
    );
}
