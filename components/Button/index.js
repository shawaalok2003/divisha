const Button = ({ type = "", size = "sm", color = "primary", text = "", className = "", icon = null, block = false, ...rest }) => {
    const getButtonClasses = () => {
        const buttonClasses = ["btn"];

        if (type === "outline") buttonClasses.push(`btn-outline-${color}`);

        return buttonClasses.join(" ");
    };

    return (
        <button className={`${getButtonClasses()} btn-${color} btn-${size} btn-${block ? "block" : ""} ${className}`} {...rest}>
            {icon || ""} {text}
        </button>
    );
};

export default Button;
