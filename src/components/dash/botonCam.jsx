import React from "react";

function BotonCam(props) {
    const { onData, name } = props;

    return (
        <div className="flex ">
            <button className="bg-transparent m-2 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => onData()}>{name}</button>
        </div>
    );
}

export default BotonCam;
