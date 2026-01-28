import { useEffect, useState } from "react";

import Select from "../Select";

import COMMON_API from "../../api/common";
import { consoleLogger } from "../../helpers";

const CityList = (props) => {
    const { title = "City", stateId = 0 } = props;

    const [cities, setCities] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);

        COMMON_API.searchCities({ page: "all", filters: stateId ? { stateId } : {} })
            .then((results) => {
                const cityResponse = results.data;

                if (cityResponse.status === "success") {
                    setCities(cityResponse.data);
                } else {
                    setCities([]);
                }
            })
            .catch((error) => {
                consoleLogger("CITIES LIST ERROR: ", error);

                setCities([]);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoader(false);
                }, 1000);
            });
    }, [stateId]);

    return (
        <Select
            title={title}
            options={[
                { label: "Select City", value: 0 },
                ,
                ...cities.map((city) => {
                    return {
                        label: `${city?.name}`,
                        value: city?.cityId,
                    };
                }),
            ]}
            disabled={loader}
            {...props}
        />
    );
};

export default CityList;
