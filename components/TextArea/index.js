const TextArea = (props) => {
    const { title = "", options = [], required = false } = props;

    return (
        <>
            <label className="font-size-sm text-dark font-weight-semibold mb-1">
                {title}
                {required === true && <span className="text-danger">{" *"}</span>}
            </label>
            <textarea className="form-control border-gray" {...props}></textarea>
        </>
    );
};

export default TextArea;
