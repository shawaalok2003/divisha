import { ASSETS } from "../../constants/assets";

const Picture = (props) => {
    const { type = "", className: restClass = "", rounded = false, circle = false, ...rest } = props;

    return (
        <img
            src={props?.src || ASSETS.noImage}
            className={`img-fluid img-${type} ${rounded ? "rounded" : ""} rounded-${circle ? "circle" : ""} ${restClass}`}
            {...rest}
        />
    );
};

export default Picture;
