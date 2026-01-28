import { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import CATEGORY_API from "../../api/category";
import Link from "next/link";
import { APPLICATION_URLS } from "../../constants";
import { useRouter } from "next/router";
import { isLightThemeMode } from "../../helpers/theme";
import { consoleLogger } from "../../helpers";

const CategorySlider = ({ title = "", autoplay = false, redirectType = null }) => {
    const router = useRouter();

    const settings = {
        autoplay: autoplay || false,
        dots: false,
        arrows: false,
        infinite: true,
        swipeToSlide: true,
        responsive: [
            { breakpoint: 4000, settings: { slidesToShow: 5 } },
            { breakpoint: 3500, settings: { slidesToShow: 5 } },
            { breakpoint: 3000, settings: { slidesToShow: 5 } },
            { breakpoint: 2500, settings: { slidesToShow: 5 } },
            { breakpoint: 2000, settings: { slidesToShow: 5 } },
            { breakpoint: 1500, settings: { slidesToShow: 5 } },
            { breakpoint: 1250, settings: { slidesToShow: 4 } },
            { breakpoint: 1000, settings: { slidesToShow: 3 } },
            { breakpoint: 770, settings: { slidesToShow: 2 } },
        ],
    };

    const sliderRef = useRef(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CATEGORY_API.searchCategories({ token: null, page: "all" })
            .then((results) => {
                const startupResponse = results.data;

                if (startupResponse.status === "success") {
                    setCategories(startupResponse.data);
                } else {
                    setCategories([]);
                }
            })
            .catch((error) => {
                consoleLogger("STARTUPS ERROR: ", error);

                setCategories([]);
            })
            .finally(() => {});
    }, []);

    const [redirectTo, setRedirectTo] = useState("");

    useEffect(() => {
        if (redirectType === "startup-category-search") {
            setRedirectTo();
        } else {
            setRedirectTo("");
        }
    }, [redirectTo, categories]);

    return (
        <>
            {categories && categories.length > 0 && (
                <section className={`pt-8 our-directory category-slider ${isLightThemeMode(router.pathname) ? "" : "dark shadow"}`}>
                    <div className="container">
                        <div className="mb-2">
                            <h2 className="mb-0">
                                <span className="font-weight-light">{title ? "Explore By " : ""}</span>
                                <span className="font-weight-semibold">{title ? title : ""}</span>
                            </h2>
                        </div>
                        <div className="d-flex align-items-center pb-6">
                            <div className="ml-auto d-flex slick-custom-nav pl-5">
                                <div className="arrow slick-prev" onClick={() => sliderRef.current.slickPrev()}>
                                    <i className="fas fa-chevron-left"></i>
                                </div>
                                <div className="arrow slick-next" onClick={() => sliderRef.current.slickNext()}>
                                    <i className="fas fa-chevron-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container pb-5">
                        <Slider {...settings} ref={sliderRef}>
                            {categories.map((category, categoryIndex) => (
                                <div className={`box mb-5 ${isLightThemeMode() ? "border" : ""}`} key={`sbox-${categoryIndex}`}>
                                    <div className="shadow card border-0 image-box-style-card box-shadow-hover">
                                        <Link
                                            href={`${APPLICATION_URLS.STARTUP_LISTING.url}?categoryId=${category.categoryId}`}
                                            className="text-center"
                                        >
                                            <img src={category.image || "/images/no-image.jpg"} className="w-100" alt={category.name} />
                                        </Link>
                                        <div className="card-body lh-1 text-center">
                                            <Link
                                                href={`${APPLICATION_URLS.STARTUP_LISTING.url}?categoryId=${category.categoryId}`}
                                                className="card-text text-dark font-size-md lh-11"
                                                alt={category.name}
                                            >
                                                {category?.name.substring(0, 17)}
                                                {category?.name.length > 17 ? "..." : ""}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </section>
            )}
        </>
    );
};

export default CategorySlider;
