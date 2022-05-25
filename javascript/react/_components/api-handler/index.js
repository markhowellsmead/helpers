// https://dev.to/nicomartin/the-right-way-to-fetch-data-with-react-hooks-48gc

import 'whatwg-fetch';
import { useEffect, useState } from 'react';

import apiStates from '../api-states';

export const getPosts = url => {
    const [state, setState] = useState(apiStates.IDLE);
    const [data, setData] = useState(null);
    const [headers, setHeaders] = useState(null);

    const doRequest = () => {
        let header_total = null;
        let header_totalpages = null;

        setState(apiStates.LOADING);
        fetch(url, {
            method: 'GET',
        })
            .then(response => {
                if (!!response.status && response.status > 399) {
                    throw Error({
                        status: response.status,
                        text: !!response.statusText ? response.statusText : '',
                    });
                }
                header_total = response.headers.get('x-wp-total');
                header_totalpages = response.headers.get('x-wp-totalpages');
                return response;
            })
            .then(response => response.json())
            .then(data => {
                setState(apiStates.SUCCESS);
                setData(data);
                setHeaders({
                    total: header_total,
                    totalpages: header_totalpages,
                });
            })
            .catch(() => {
                setState(apiStates.ERROR);
            });
    };

    return {
        state,
        data,
        headers,
        doRequest,
        setState,
        setData,
        setHeaders,
    };
};

export const apiGet = url => {
    const [api_data, setAPIData] = useState({
        state: apiStates.LOADING,
        error: '',
        data: [],
        headers: {},
    });

    let header_total = null;

    const setPartData = partialData => setAPIData({ ...api_data, ...partialData });

    useEffect(() => {
        setPartData({
            state: apiStates.LOADING,
        });
        fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-WP-Nonce': sht_wp_api.nonce,
            },
        })
            .then(response => {
                if (!!response.status && response.status > 399) {
                    throw Error({
                        status: response.status,
                        text: !!response.statusText ? response.statusText : '',
                    });
                }
                header_total = response.headers.get('X-WP-Total');
                return response;
            })
            .then(response => response.json())
            .then(json => {
                setPartData({
                    state: apiStates.SUCCESS,
                    data: json,
                    headers: {
                        total: header_total,
                    },
                });
            })
            .catch(error => {
                setPartData({
                    state: apiStates.ERROR,
                    error: !!error.statusText ? error.statusText : 'fetch failed',
                });
            });
    }, []);

    return api_data;
};
