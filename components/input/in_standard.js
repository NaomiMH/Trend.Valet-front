import React from 'react';

const In_standard = ({ inPlaceHolder, inName, onChange = null }) => {
    return (
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={inName}
            type="text"
            placeholder={inPlaceHolder}
            onChange={onChange ? (event) => { onChange(event) } : null}
        />
    );
}

export default In_standard;