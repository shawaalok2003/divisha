import Footer from "./Footer";
import TopMenu from "./TopMenu";

const ListingLayout = ({ children }) => {
    return (
        <div id="site-wrapper" className="site-wrapper">
            <TopMenu />
            {children}
            <Footer />
        </div>
    );
};

export default ListingLayout;
