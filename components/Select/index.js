const Select = (props) => {
    const { title = "", options = [], required = false, bordered = false } = props;

    return (
        <>
            <label className="font-size-sm text-dark font-weight-semibold mb-1">
                {title}
                {required === true && <span className="text-danger">{" *"}</span>}
            </label>
            <select className={`form-control border-${bordered ? "gray" : ""}`} {...props}>
                {options?.map((o, oIndex) => (
                    <option key={`sel-${oIndex}-${o?.value || o?.key}`} value={o?.value || o?.key}>
                        {o?.label || o?.name}
                    </option>
                ))}
            </select>
        </>
    );
};

export default Select;
