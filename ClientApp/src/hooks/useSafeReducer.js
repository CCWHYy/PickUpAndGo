import { useEffect, useReducer, useRef } from 'react';

export const useSafeReducer = (reducer, initialState) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;

        return () => { mountedRef.current = false; };
    }, []);

    const safeDispatch = (...args) => mountedRef.current && dispatch(...args);

    return [state, safeDispatch];
};

export default useSafeReducer;
