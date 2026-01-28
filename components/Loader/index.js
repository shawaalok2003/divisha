const Loader = ({ title = "", subtitle = "", mini = false }) => {
    return (
        <div className={mini ? "" : "text-center"}>
            <img src={"/images/loader.gif"} style={{ width: mini ? "40px" : "60px" }} alt="Loading..." />
            <h5 className="pt-3 text-dark font-weight-medium">{title}</h5>
            <p>
                <i className="text-gray">{subtitle}</i>
            </p>
        </div>
    );
};

export default Loader;
