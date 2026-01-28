const Input = (props) => {
    const { title = "", type: inputType = "text", required = false } = props;
    return (
        <div className={["checkbox", "radio"].includes(inputType) ? "" : "w-100"}>
            {title && (
                <label className="font-size-sm text-dark font-weight-semibold mb-1">
                    {title}
                    {required === true && <span className="text-danger">{" *"}</span>}
                </label>
            )}
            <input className="form-control border-gray" type={inputType} {...props} />
        </div>
    );
};

export default Input;
