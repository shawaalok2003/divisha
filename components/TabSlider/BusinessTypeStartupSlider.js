import { useState, useRef } from "react";
import Slider from "react-slick";
import { businessTypeStartups } from "../../data/startups";
import SliderStartupBox from "../SliderStartupBox";

const BusinessTypeStartupSlider = () => {
    const settings = {
        autoplay: true,
        dots: false,
        arrows: false,
        infinite: true,
        swipeToSlide: true,
        responsive: [
            { breakpoint: 2000, settings: { slidesToShow: 4 } },
            { breakpoint: 1500, settings: { slidesToShow: 3 } },
            { breakpoint: 1000, settings: { slidesToShow: 2 } },
            { breakpoint: 770, settings: { slidesToShow: 1 } },
        ],
    };

    const tabsData = [
        { key: "b2b", name: "B2B" },
        { key: "b2c", name: "B2C" },
        { key: "b2b2c", name: "B2B2C" },
        { key: "d2c", name: "D2C" },
    ];

    const [currentTab, setCurrentTab] = useState(tabsData[0].key);
    const sliderRef = tabsData.reduce((obj, item) => Object.assign(obj, { [item.key]: useRef(null) }), {});

    return (
        <section className="pt-8 pb-8 our-directory">
            <div className="container">
                <div className="mb-7">
                    <h2 className="mb-0">
                        <span className="font-weight-semibold">Business</span>
                        <span className="font-weight-light">Type</span>
                    </h2>
                </div>
                <div className="d-flex align-items-center pb-8">
                    <ul className="nav nav-pills tab-style-01">
                        {tabsData &&
                            tabsData.length > 0 &&
                            tabsData.map((tab, tabIndex) => (
                                <li className={`nav-item`} key={`tl-${tab.key}-${Date.now()}`} onClick={() => setCurrentTab(tab.key)}>
                                    <a className={`nav-link${currentTab === tab.key ? " active" : ""}`}>{tab.name}</a>
                                </li>
                            ))}
                    </ul>
                    <div className="ml-auto d-flex slick-custom-nav pl-5">
                        <div className="arrow slick-prev" onClick={() => sliderRef[currentTab].current.slickPrev()}>
                            <i className="fas fa-chevron-left"></i>
                        </div>
                        <div className="arrow slick-next" onClick={() => sliderRef[currentTab].current.slickNext()}>
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="tab-content">
                    {tabsData &&
                        tabsData.length > 0 &&
                        tabsData.map((tab, tabIndex) => {
                            return (
                                <div className={`tab-pane fade ${currentTab === tab.key ? "show active" : ""}`} key={`slid-${tab.key}-${tabIndex}`}>
                                    <Slider {...settings} ref={sliderRef[tab.key]}>
                                        {[
                                            ...businessTypeStartups,
                                            ...businessTypeStartups,
                                            ...businessTypeStartups,
                                            ...businessTypeStartups,
                                            ...businessTypeStartups,
                                            ...businessTypeStartups,
                                            ...businessTypeStartups,
                                            ...businessTypeStartups,
                                            ...businessTypeStartups,
                                        ]
                                            .filter((stp) => stp.category === currentTab)
                                            .map((startup, startupIndex) => (
                                                <SliderStartupBox startup={startup} key={`sbox-${startupIndex}`} />
                                            ))}
                                    </Slider>
                                </div>
                            );
                        })}
                </div>
            </div>
        </section>
    );
};

export default BusinessTypeStartupSlider;
