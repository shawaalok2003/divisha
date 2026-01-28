const PageSize = ({ pageSize = null, setPageSize }) => {
    const DEFAULT_PAGE_SIZES = [
        {
            name: 5,
            value: 5,
        },
        {
            name: "10",
            value: "10",
        },
        {
            name: "25",
            value: "25",
        },
        {
            name: "50",
            value: "50",
        },
        {
            name: "100",
            value: "100",
        },
    ];

    return (
        <>
            {pageSize && (
                <div className="d-flex align-items-center">
                    <label className="text-dark mb-0 mr-3">Showing</label>
                    <select className="form-control color-gray w-auto pl-2 pr-6" value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
                        {DEFAULT_PAGE_SIZES.map((ps, psi) => (
                            <option value={ps.value} key={`ps-list-${psi}`}>
                                {ps.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </>
    );
};

export default PageSize;
