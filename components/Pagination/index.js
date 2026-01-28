const Pagination = ({ count = 0, pageSize = 0, pageNo = 0, setPageNo }) => {
    const extraPage = count % pageSize === 0 ? 0 : 1;
    const totalPages = parseInt(count / pageSize) + extraPage;

    return (
        <>
            {count > pageSize && (
                <div className="row">
                    <div className="col-md-8 p-3">
                        <ul className="pagination pagination-style-02 bg-white p-5">
                            {pageNo - 1 >= 1 && (
                                <li className="page-item mx-1 border">
                                    <button className="page-link bg-gray" onClick={() => setPageNo(pageNo - 1)}>
                                        <i className="fal fa-chevron-left mr-2 text-dark"></i> Previous
                                    </button>
                                </li>
                            )}

                            {[...Array(totalPages).keys()].map((number, i) => (
                                <li key={`pg-${i}-nos`} className={`page-item mx-1 border ${pageNo === i ? "" : ""}`} onClick={() => setPageNo(i)}>
                                    <button className={`page-link bg-gray ${pageNo === i ? "current" : ""}`}>{number + 1}</button>
                                </li>
                            ))}

                            {pageNo - 1 >= 0 && pageNo - 1 < totalPages - 1 && (
                                <li className="page-item mx-1 border">
                                    <button onClick={() => setPageNo(pageNo + 1)} className="page-link bg-gray">
                                        Next<i className="fal fa-chevron-right ml-2 text-dark"></i>
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="col-md-4 p-3">
                        <ul className="pagination pagination-style-02 bg-white p-5">
                            <li className="page-item text-dark w-100 text-center">
                                Showing {pageNo * pageSize + 1} to {pageNo * pageSize + pageSize < count ? pageNo * pageSize + pageSize : count} of{" "}
                                {count} results
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default Pagination;
