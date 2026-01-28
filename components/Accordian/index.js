import { useState } from "react";

const Accordian = ({ title = "", open = false, scrollable = false, children, ...rest }) => {
    const [show, setShow] = useState(open);

    return (
        <div className="accordian-single" {...rest}>
            <div className="header">
                {title}
                <i className={`far fa-${show ? "minus" : "plus"}-square text-dark cursor`} onClick={() => setShow(!show)} />
            </div>
            {show && <div className={`body ${scrollable ? "scrollable" : ""}`}>{children}</div>}
        </div>
    );
};

export default Accordian;
