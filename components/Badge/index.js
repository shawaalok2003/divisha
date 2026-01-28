const Badge = ({ type = "", color = "primary", text = "", className = "", ...rest }) => {
    const getBadgeClasses = () => {
        const badgeClasses = ["badge p-0 px-2 py-1"];

        if (type === "pill") badgeClasses.push("badge-pill");

        return badgeClasses.join(" ");
    };
    return (
        <span className={`${getBadgeClasses()} badge-${color} ${className}`} {...rest}>
            {text}
        </span>
    );
};

export default Badge;
