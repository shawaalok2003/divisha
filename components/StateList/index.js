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

        COMMON_API.searchStates({ page: "all", filters: countryId ? { countryId } : {} })
            .then((results) => {
                const stateResponse = results.data;

                if (stateResponse.status === "success") {
                    setStates(stateResponse.data);
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
