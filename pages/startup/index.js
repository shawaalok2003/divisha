import Head from "next/head";
import ListingLayout from "../../components/layout/ListingLayout";

export default function Startup() {
    const startupFeatures = [
        {
            title: "Networking Opportunities",
            description:
                "Our platform connects you with a diverse community of entrepreneurs, investors, and industry experts. This gives you the opportunity to meet new people, learn from their experiences, and make valuable connections that can help your business grow.",
        },
        {
            title: "Access to Capital",
            description:
                "As a startup, access to funding can be a major hurdle. We aim to help bridge that gap by connecting startups with investors who are interested in funding innovative and promising businesses.",
        },
        {
            title: "Mentorship and Support",
            description:
                "Starting a business can be a daunting task, and it's important to have someone to guide and support you along the way. Our platform provides access to experienced mentors and advisors who can offer valuable advice and support.",
        },
        {
            title: "Educational Resources",
            description:
                "We understand that starting a business requires a lot of learning, so we provide access to educational resources such as webinars, tutorials, and workshops. These resources cover a wide range of topics, from marketing and finance to legal and compliance.",
        },
        {
            title: "Exclusive Discounts & Deals",
            description:
                "As a member of our community, you'll have access to exclusive discounts and deals on products and services that can help your business grow. From office space to marketing services, we've got you covered.",
        },
        {
            title: "Community Events",
            description:
                "We organize various events such as workshops, meetups, and conferences, where startups can learn, network, and showcase their products or services.",
        },
        {
            title: "Access to Government Grants & Schemes",
            description:
                "Our platform provides access to various government grants and schemes which can be helpful for the startup in their initial stages",
        },
        {
            title: "Collaboration with other startups",
            description:
                "Our platform encourages collaboration between startups, which can lead to the formation of new partnerships, joint ventures and even merge of companies.",
        },
    ];

    return (
        <ListingLayout>
            <Head>
                <title>Startups</title>
                <meta property="og:title" content="Startups" key="startups" />
            </Head>
            <div className="page-title mt-10 pt-10 pb-10">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="jumbotron mb-6 bg-transparent p-0 text-dark ">
                                <h3 className="mb-7 text-dark text-center">STARTUPS</h3>
                                <p className="lead mb-0 font-size-lg font-weight-normal lh-18">
                                    Starting a business can be a challenging and rewarding experience, but it can also be a lonely one. That's why we
                                    created our platform, to provide a community for startups to connect, collaborate, and grow.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-12 mt-2">
                            <div className="row no-gutters">
                                {startupFeatures &&
                                    startupFeatures.map((sf, sfIndex) => (
                                        <div key={`sf-${sfIndex}`} className="col-lg-4 mb-4 mb-lg-5 px-0 px-lg-4 animate__animated animate__fadeInUp">
                                            <div className="media icon-box-style-02">
                                                <div className="d-flex flex-column align-items-center mr-6 color-primary">
                                                    <span className="number h1 text-dark font-weight-bold">{sfIndex + 1}</span>
                                                </div>
                                                <div className="media-body lh-14">
                                                    <h4 className="mb-3 text-dark font-weight-bold">{sf.title || ""}</h4>
                                                    <p className="font-size-md mb-0">{sf.description || ""}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <p className="text-dark lead mt-6 font-size-lg font-weight-normal lh-18">
                                In addition to these benefits, we also offer a variety of tools and resources designed to help you manage and grow
                                your business. From legal and financial advice to marketing and PR support, we've got everything you need to take your
                                business to the next level.
                            </p>

                            <p className="text-dark lead font-size-lg font-weight-normal lh-18">
                                So if you're a startup looking for a supportive community, access to funding and resources, and the opportunity to
                                connect with like-minded entrepreneurs, register with us today and start reaping the benefits of our platform!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ListingLayout>
    );
}
