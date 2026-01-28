import { Children, useState } from "react";
import Input from "../Input";

const MultiSelect = ({ data = [], bordered = false, onSelect }) => {
    return (
        <div className="multiselect">
            {data &&
                Array.isArray(data) &&
                data.map((msd, msdIndex) => (
                    <div className={`item ${bordered ? "bordered" : ""}`} key={`msd-${msdIndex}`}>
                        <Input
                            type="checkbox"
                            defaultChecked={data[msdIndex].selected}
                            onClick={(e) => {
                                const msdData = data;
                                msdData[msdIndex].selected = e.target.checked;

                                onSelect(msdData);
                            }}
                        />
                        <div className="ml-2 font-weight-medium">{msd?.title || msd?.name}</div>
                    </div>
                ))}
        </div>
    );
};

export default MultiSelect;
