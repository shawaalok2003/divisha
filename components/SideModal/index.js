const SideModal = ({ title = "", show = false, onClose = () => {}, children }) => {
    return (
        <div className={`side-modal ${show ? "" : "hide"}`}>
            <div className="side-modal-overflow" onClick={() => onClose()}></div>
            <div className="side-modal-body">
                <div className="menu d-flex align-items-center justify-content-between border-bottom">
                    <span className="py-2 pl-2 text-dark font-weight-medium">{title}</span>
                    <span className="py-2 px-2 cursor-pointer bg-light border-left" onClick={() => onClose()}>
                        <i className="far fa-window-close text-dark"></i>
                    </span>
                </div>
                <div className="content">{children}</div>
            </div>
        </div>
    );
};

export default SideModal;
