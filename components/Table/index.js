import Loader from "../Loader";
import TablePagination from "./Pagination";

const Table = (props) => {
    const {
        type = "simple",
        headers: tableHeaders = [],
        data: tableData = [],
        hidePagination = false,
        pagination: paginationData,
        messages: tableMessages = {
            noData: "No Data Found",
        },
        hover = true,
        bordered = false,
        onRowClick = () => {},
        shadow = false,
        loader: tableLoader = false,
        loaderTitle = "",
        loaderSubtitle = "",
    } = props;

    const prepareTableClass = () => {
        const preparedClass = ["table"];

        if (hover === true && !tableLoader) preparedClass.push("table-hover");
        if (bordered === true) preparedClass.push("table-bordered");
        if (type === "simple") {
            preparedClass.push("listing-table-simple");
        } else {
            preparedClass.push("listing-table");
        }

        return preparedClass.join(" ");
    };

    return (
        <>
            <div className={`row`}>
                <div className="col-sm-12">
                    <div className={`table-responsive bg-white ${shadow ? "shadow-sm" : ""}`}>
                        <table className={prepareTableClass()}>
                            <thead>
                                <tr style={{ backgroundColor: "#f9f9f9" }} className={`border-top border-left border-right`}>
                                    {tableHeaders.map((tabHead, tabHeadIndex) => {
                                        return (
                                            <th key={`tbh-${tabHeadIndex}-${Date.now()}`} className={`px-3 py-4 ${tabHead?.class || ""}`}>
                                                {tabHead?.label || ""}
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {tableLoader && (
                                    <tr>
                                        <td colSpan={tableHeaders?.length} className="text-center">
                                            <div className="py-10">
                                                <Loader title={loaderTitle} subtitle={loaderSubtitle} />
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                {!tableLoader && tableData?.length === 0 && (
                                    <tr>
                                        <td colSpan={tableHeaders?.length} className="text-center">
                                            <h6 className="pt-5 pb-4 text-danger font-weight-medium">{tableMessages?.noData}</h6>
                                        </td>
                                    </tr>
                                )}
                                {!tableLoader &&
                                    tableData?.map((tabData, tabDataIndex) => (
                                        <tr
                                            key={`tbl-rw-${tabDataIndex}`}
                                            onClick={(e) => onRowClick({ e, tabData })}
                                            style={{ cursor: "pointer" }}
                                            className="border-bottom"
                                        >
                                            {Object.keys(tabData).map((dataKey, dataKeyIndex) => {
                                                return (
                                                    <td
                                                        key={`tbl-rw-td-${tabDataIndex}-${dataKeyIndex}`}
                                                        className={`${dataKeyIndex === 0 ? "border-left" : ""}${
                                                            dataKeyIndex === Object.keys(tabData)?.length - 1 ? "border-right" : ""
                                                        }`}
                                                    >
                                                        {tabData[dataKey]}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {!hidePagination && <TablePagination {...paginationData} shadow={shadow} />}
        </>
    );
};

export default Table;
