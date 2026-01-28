import Slider from "react-slick";
import { getSignedUrl } from "../../helpers/storage";

const BannerSlider = ({ className: extraClassName, data = [] }) => {
    const slickSettings = {
        slidesToShow: 1,
        autoplay: true,
        infinite: true,
        centerMode: true,
        centerPadding: 0,
        dots: false,
        arrows: false,
        variableWidth: true,
        variableHeight: true,
        focusOnSelect: true,
        swipeToSlide: true,
        responsive: [
            { breakpoint: 2000, settings: { arrows: false, autoplay: true } },
            { breakpoint: 1500, settings: { arrows: false, autoplay: true } },
            { breakpoint: 1000, settings: { arrows: false, autoplay: true } },
            { breakpoint: 770, settings: { arrows: false, autoplay: true } },
        ],
    };

    return (
        <div className={`startup-banner image-gallery ${extraClassName}`} style={data && data.length ? {} : { display: "none" }}>
            <Slider {...slickSettings}>
                {data &&
                    data.map((d, dIndex) => {
                        if (d.type === "youtube") {
                            return (
                                <div className="box pl-0 pr-0" key={`stp-ban-${dIndex}`}>
                                    <iframe
                                        src={d.file}
                                        title={d.title || ""}
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowfullscreen
                                    />
                                </div>
                            );
                        }

                        return (
                            <div className="box pl-0 pr-0" key={`stp-ban-${dIndex}`}>
                                <img src={d.file ? getSignedUrl(d.file) : "/images/no-image.jpg"} alt={d.title || ""} />
                            </div>
                        );
                    })}
            </Slider>
        </div>
    );
};

export default BannerSlider;
