import { useEffect, useState } from "react";

import Select from "../Select";

import COMMON_API from "../../api/common";
import { consoleLogger } from "../../helpers";

const CountryList = (props) => {
    const { title = "Country" } = props;

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        COMMON_API.searchCountries({ page: "all", filters: {} })
            .then((results) => {
                const countryResponse = results.data;

                if (countryResponse.status === "success") {
                    setCountries(countryResponse.data);
                } else {
                    setCountries([]);
                }
            })
            .catch((error) => {
                consoleLogger("COUNTRIES LIST ERROR: ", error);

                setCountries([]);
            })
            .finally(() => {});
    }, []);

    return (
        <Select
            title={title}
            options={countries.map((cont) => {
                return {
                    label: `+${cont?.mobileCode} | ${cont?.name}`,
                    value: cont?.countryId,
                };
            })}
            {...props}
        />
    );
};

export default CountryList;
