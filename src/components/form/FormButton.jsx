import React from 'react';
import PropTypes from 'prop-types';

const FormButton = ({text, type, onSubmit}) => {
    return (
        <button
                className="w-full py-3 px-4
                bg-sky-700 
                dark:bg-sky-900
                text-zinc-100 
                dark:text-zinc-100
                shadow-tiny 
                shadow-zinc-700
                dark:shadow-gray-900
                rounded-xl 
                hover:bg-sky-500
                dark:hover:bg-sky-950
                transition-all duration-300 ease-in-out"
                type={type}
                onClick={onSubmit}
            >
                {text}
        </button>
    )
}

FormButton.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default FormButton