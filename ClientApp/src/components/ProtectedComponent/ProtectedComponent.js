import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { getStorageToken } from "../../utils/localStorage";
import { useFetch } from "../../hooks/useFetch";
import {isRequestSuccessed} from "../../utils/request";
import { setDetails } from "../../redux/auth/actions";

export const ProtectedComponent = ({ children }) => {
    const history = useHistory();
    const token = getStorageToken();
    const dispatch = useDispatch();
    const [request, makeRequest] = useFetch({
        url: '/api/users/me',
    });

    useEffect(() => {
        makeRequest();
    }, []);

    useEffect(() => {
        if (isRequestSuccessed(request)) {
            dispatch(setDetails(request.data));
        }
    }, [request]);

    if (!token || request.error) {
        history.push('/');
        return null;
    }
    else {
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }

};

export default ProtectedComponent;
