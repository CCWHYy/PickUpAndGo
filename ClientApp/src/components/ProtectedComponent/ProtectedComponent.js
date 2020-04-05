import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';

import { getStorageToken } from "../../utils/localStorage";
import { useFetch } from "../../hooks/useFetch";

export const ProtectedComponent = ({ children }) => {
    const history = useHistory();
    const token = getStorageToken();
    const [request, makeRequest] = useFetch({
        url: '/api/users/me',
    });

    useEffect(() => {
        makeRequest();
    }, []);


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
