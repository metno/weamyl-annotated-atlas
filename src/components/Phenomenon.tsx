import React from "react";
import CreatableSelect from "react-select/creatable";
import phenomena from '../config/Phenomena.json';

const Phenomenon: React.FC = () => {
    const optionList = [];
    const phenomValues = Object.values(phenomena);
    for (let i = 0; i < phenomValues.length; i += 1) {
        optionList[i] = {"value": Object.values(phenomValues)[i].guiName.nb, "label": Object.values(phenomValues)[i].guiName.nb };
    }
    return (
        <>
            <CreatableSelect
                isClearable
                placeholder={"Phenomenon"}
                options={optionList}
            />
        </>
    )
}

export default Phenomenon;