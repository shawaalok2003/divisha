import ListingLayout from "../../components/layout/ListingLayout";

export default function PrivacyPolicy() {
    return (
        <ListingLayout>
            <div className="page-title mt-10 pt-10 pb-10">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-5">
                            <h1>Community Guidelines</h1>
                        </div>
                        <div className="col-md-12">
                            <p>
                                Welcome to StartXV, a platform designed to connect startups and investors in the most efficient way possible. Our
                                service is designed to be user-friendly and easy to navigate, but it is important that you understand the terms and
                                conditions of using our platform.
                            </p>

                            <p>
                                By using our website, you agree to be bound by the following terms of service. If you do not agree to these terms,
                                please do not use our website.
                            </p>

                            <p>
                                <b>For Startups:</b>
                                <ul>
                                    <li>
                                        Startups are required to provide accurate and up-to-date information about their business and financials. Any
                                        false or misleading information will result in termination of their account.
                                    </li>
                                    <li>Startups must comply with all applicable laws and regulations.</li>
                                    <li>
                                        Startups are responsible for protecting their own intellectual property and must not infringe on the
                                        intellectual property of others.
                                    </li>
                                </ul>
                            </p>

                            <p>
                                <b>For Investors:</b>
                                <ul>
                                    <li>Investors are required to comply with all applicable laws and regulations.</li>
                                    <li>
                                        All investments are made at the investor's own risk. StartXV does not provide any guarantees or assurances
                                        about the success of any investment.
                                    </li>
                                    <li>Investors must do their own due diligence and research before making any investment decisions.</li>
                                </ul>
                            </p>

                            <p>
                                <b>Website Visitors:</b>
                                <ul>
                                    <li>By accessing our website, you agree to be bound by these terms of service.</li>
                                    <li>We reserve the right to make changes to these terms at any time without notice.</li>
                                    <li>We are not responsible for any errors or omissions on our website.</li>
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ListingLayout>
    );
}
