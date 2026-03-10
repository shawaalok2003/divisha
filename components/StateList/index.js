import { useEffect, useState } from "react";

import Select from "../Select";

import COMMON_API from "../../api/common";
import { consoleLogger } from "../../helpers";

const StateList = (props) => {
    const { title = "State", countryId = 0 } = props;

    const [states, setStates] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        const normalizedCountryId = countryId ? parseInt(countryId) : 0;

        COMMON_API.searchStates({ page: 0, limit: 10000, filters: normalizedCountryId ? { countryId: normalizedCountryId } : {} })
            .then((results) => {
                const stateResponse = results.data;

                if (stateResponse.status === "success") {
                    if (stateResponse.data.length > 0) {
                        setStates(stateResponse.data);
                        return;
                    }

                    if (normalizedCountryId) {
                        return COMMON_API.searchStates({ page: 0, limit: 10000, filters: {} }).then((fallbackResult) => {
                            const fallbackResponse = fallbackResult.data;
                            setStates(fallbackResponse.status === "success" ? fallbackResponse.data : []);
                        });
                    }

                    setStates([]);
                } else {
                    setStates([]);
                }
            })
            .catch((error) => {
                consoleLogger("STATES LIST ERROR: ", error);

                setStates([]);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoader(false);
                }, 1000);
            });
    }, [countryId]);

    return (
        <Select
            title={title}
            options={[
                { label: "Select State", value: 0 },
                ...states.map((state) => {
                    return {
                        label: `${state?.name}`,
                        value: state?.stateId,
                    };
                }),
            ]}
            disabled={loader}
            {...props}
        />
    );
};

export default StateList;
