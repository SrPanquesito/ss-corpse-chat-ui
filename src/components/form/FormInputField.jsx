import React from 'react';
import PropTypes from 'prop-types';

const FormInputField = ({id, label, placeholder, type, value, onChangeHandler}) => {
    return (
        <>
            <label className="text-sm text-sky-800 dark:text-zinc-100" 
                htmlFor={id}
            >
                {label}
            </label>
            {
                type !== 'file' ?
                <input className="w-full py-2
                    border-none 
                    rounded-xl 
                    dark:border-solid dark:border-slate-700
                    shadow-tiny shadow-zinc-300 
                    dark:shadow-slate-800
                    text-sm text-gray-500 placeholder:text-gray-400 
                    dark:text-gray-400 dark:placeholder:text-gray-700
                    dark:bg-zinc-900
                    caret-sky-600
                    dark:caret-sky-800
                    focus:ring-sky-600
                    dark:focus:ring-sky-800
                    focus:outline-none"
                    type={type}
                    id={id} 
                    name={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChangeHandler}
                />
                :
                <div className="flex items-center space-x-2">
                    {
                        value ?
                        <img className="w-12 h-12 rounded-full border 
                            dark:bg-zinc-900
                            border-zinc-300
                            dark:border-slate-700" 
                            src={value} alt="profile" />
                        :
                        <div className="w-12 h-12 rounded-full border 
                            dark:bg-zinc-900
                            border-zinc-300
                            dark:border-slate-700"
                        ></div>
                    }
                    <input className="flex-1 py-2
                        border-none 
                        rounded-xl 
                        dark:border-solid dark:border-slate-700
                        shadow-tiny shadow-zinc-300 
                        dark:shadow-slate-800
                        text-sm text-gray-500 placeholder:text-gray-400 
                        dark:text-gray-400 dark:placeholder:text-gray-700
                        dark:bg-zinc-900
                        caret-sky-600
                        dark:caret-sky-800
                        focus:ring-sky-600
                        dark:focus:ring-sky-800
                        focus:outline-none"
                        type={type}
                        id={id} 
                        name={id}
                        onChange={onChangeHandler}
                    />
                </div>
            }
        </>
    )
}

FormInputField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired
}

export default FormInputField