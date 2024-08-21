import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({id, placeholder, value, onChangeHandler}) => {
    return (
        <div className="flex items-center relative">
            <div className="absolute left-2">
                <svg className="size-5 dark:text-gray-400" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>
            <input className="w-full pl-9 pr-2
                border-none 
                rounded-2xl 
                dark:border-solid dark:border-slate-700
                shadow shadow-zinc-300 
                dark:shadow-slate-800
                text-sm text-gray-600 placeholder:text-gray-400 
                dark:text-gray-400 dark:placeholder:text-gray-700
                bg-slate-200
                dark:bg-zinc-900
                caret-sky-600
                dark:caret-sky-800
                focus:ring-sky-600
                dark:focus:ring-sky-800
                focus:outline-none"
                type="search"
                id={id}
                name={id}
                placeholder={placeholder}
                value={value}
                onChange={onChangeHandler}
            />
        </div>
    )
}

SearchInput.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeHandler: PropTypes.func.isRequired
}

export default SearchInput