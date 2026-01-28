import Head from "next/head";
import { useEffect, useState } from "react";

import StartupLayout from "../../components/layout/StartupLayout";
import useStartup from "../../hooks/useStartup";
import Pagination from "../../components/Pagination";
import STARTUP_ENQUIRY_API from "../../api/startup/enquiry";
import { consoleLogger } from "../../helpers";

export default function StartupIncubation() {
    const { startup } = useStartup();

    const [enquiries, setEnquiries] = useState([]);
    const [enquiriesCount, setEnquiriesCount] = useState(0);

    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        STARTUP_ENQUIRY_API.searchStartupEnquiries({ token: startup.token, page: pageNo, sort: "desc", filters: {} })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setEnquiries(startupResponse.data);
                    setEnquiriesCount(startupResponse.count);
                } else {
                    setEnquiries([]);
                    setEnquiriesCount(0);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setEnquiries([]);
                setEnquiriesCount(0);
            })
            .finally(() => {});
    }, [pageNo]);

    return (
        <StartupLayout>
            <Head>
                <title>Enquiries | Startup</title>
                <meta property="og:title" content="Enquiries | Startup" key="enquiries-startup" />
            </Head>
            <div className="row">
                <div className="col-md-12">
                    <div className="table-responsive-md bg-white p-5">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#ID</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enquiries && enquiries.length === 0 && (
                                    <tr>
                                        <td colSpan={6}>
                                            <h6 className="text-danger text-center pt-5 pb-5">No Enquiries Found</h6>
                                        </td>
                                    </tr>
                                )}
                                {enquiries &&
                                    enquiries.map((inc, incIndex) => (
                                        <tr key={`enq-row-${incIndex}`}>
                                            <td className="pt-2 pb-2">{inc.startupEnquiryId || "NA"}</td>
                                            <td className="pt-2 pb-2">{inc.mobile || "NA"}</td>
                                            <td className="pt-2 pb-2">{inc.email || "NA"}</td>
                                            <td className="pt-2 pb-2">{inc.message || "NA"}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Pagination count={enquiriesCount} pageSize={pageSize} pageNo={pageNo} setPageNo={setPageNo} />
        </StartupLayout>
    );
}
