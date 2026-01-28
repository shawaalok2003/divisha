const TablePagination = (props) => {
    const { pageNo = 1, setPageNo = () => {}, pageSize = 10, count = 0, shadow = false } = props;

    const equalResult = count % pageSize === 0 ? 0 : 1;
    const totalPages = parseInt(count / pageSize) + equalResult;

    return (
        <>
            {count > pageSize && (
                <div className="row">
                    <div className="col-md-8 p-3">
                        <ul className={`pagination pagination-style-02 bg-white p-5 h-100 border ${shadow ? "shadow-sm" : ""}`}>
                            {pageNo > 1 && (
                                <li className="page-item mx-1">
                                    <button className="page-link bg-gray border font-weight-medium shadow-sm" onClick={() => setPageNo(pageNo - 1)}>
                                        {"<< "} Previous
                                    </button>
                                </li>
                            )}

                            {[...Array(totalPages).keys()].map((number, i) => (
                                <li
                                    key={`pg-${i}-nos`}
                                    className={`page-item mx-1 ${pageNo - 1 === i ? "" : ""}`}
                                    onClick={() => setPageNo(number + 1)}
                                >
                                    <button
                                        className={`page-link bg-gray border font-weight-medium ${shadow ? "shadow-sm" : ""} ${
                                            pageNo - 1 === i ? "current" : ""
                                        }`}
                                    >
                                        {number + 1}
                                    </button>
                                </li>
                            ))}

                            {pageNo >= 1 && pageNo < totalPages && (
                                <li className="page-item mx-1">
                                    <button
                                        onClick={() => setPageNo(pageNo + 1)}
                                        className={`page-link bg-gray border rounded font-weight-medium ${shadow ? "shadow-sm" : ""}`}
                                    >
                                        Next {" >>"}
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="col-md-4 p-3">
                        <ul
                            className={`d-flex align-items-center pagination font-weight-medium bg-white p-5 h-100 border ${
                                shadow ? "shadow-sm" : ""
                            }`}
                        >
                            <li className="page-item text-dark w-100 text-center">
                                Showing {parseInt(parseInt(pageNo - 1) * pageSize) + 1} to {pageNo * pageSize < count ? pageNo * pageSize : count} of{" "}
                                {count} results
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default TablePagination;
