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
                            <h1>Contact Us</h1>
                        </div>
                        <div className="col-md-12 pt-10">
                            <div className="heading text-center mb-10">
                                <h4 className="mb-0 lh-12 text-gray">
                                    Contact us for any further questions, possible projects and business partnerships
                                </h4>
                            </div>
                            <div className="row mb-10">
                                <div className="col-md-4 mb-5 mb-md-0">
                                    <div className="text-center">
                                        <h5 className="font-weight-bold text-uppercase mb-5 text-dark">Contact Directly</h5>
                                        <div className="d-flex flex-column">
                                            <span className="text-gray">support@startxv.com</span>
                                            <span className="text-gray">(+91) 912-3548-073</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-5 mb-md-0">
                                    <div className="text-center">
                                        <h5 className="font-weight-bold text-uppercase mb-5 text-dark">Visit our office</h5>
                                        <div className="d-flex flex-column">
                                            <span className="text-gray">101, Relcon Enclave, NH-48</span>
                                            <span className="text-gray">Surat, Gujarat, India - 394325</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="contact-info-item text-center">
                                        <h5 className="font-weight-bold text-uppercase mb-5 text-dark">work with us</h5>
                                        <div className="d-flex flex-column">
                                            <span className="text-gray">Send your CV to our email:</span>
                                            <span className="text-gray">career@startxv.com</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ListingLayout>
    );
}
