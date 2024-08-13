import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { absoluteReducer, absoluteDefaultValues } from './AbsoluteReducer';

const AbsoluteContext = createContext(null);
const AbsoluteDispatchContext = createContext(null);

export function AbsoluteProvider({ children }) {
    const [absolute, dispatchAbsolute] = useReducer(absoluteReducer, absoluteDefaultValues);

    return (
        <AbsoluteContext.Provider value={absolute}>
          <AbsoluteDispatchContext.Provider value={dispatchAbsolute}>
            {children}
          </AbsoluteDispatchContext.Provider>
        </AbsoluteContext.Provider>
      );
}

AbsoluteProvider.propTypes = {
    children: PropTypes.object.isRequired
}

export function useAbsolute() {
    return useContext(AbsoluteContext);
}

export function useDispatchAbsolute() {
    return useContext(AbsoluteDispatchContext);
}
