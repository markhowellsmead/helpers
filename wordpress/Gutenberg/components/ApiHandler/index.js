import { useState, useEffect } from 'react';

export const apiStates = {
    IDLE: 'IDLE',
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
};

export const apiGet = url => {
    const [state, setState] = useState(apiStates.IDLE);
    const [data, setData] = useState(null);
    const doRequest = () => {
        setState(apiStates.LOADING);
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                setState(apiStates.SUCCESS);
                setData(data);
            })
            .catch(() => {
                setState(apiStates.ERROR);
            });
    };
    return {
        state,
        data,
        doRequest,
        setState,
        setData,
    };
};

export const apiGetAll = (base, getParams = {}, perPage = 20) => {
    const [data, setData] = useState({
        state: apiStates.LOADING,
        error: '',
        data: [],
    });

    const setPartData = partialData => setData({ ...data, ...partialData });

    const createUrl = (base, params) => {
        const paramsArray = Object.keys(params).map(key => `${key}=${params[key]}`);
        return `${base}?${paramsArray.join('&')}`;
    };

    const fetchAllPosts = () =>
        new Promise((resolve, reject) => {
            // erst müssen wir die erste Seite laden
            fetch(
                createUrl(base, {
                    ...getParams,
                    per_page: perPage,
                })
            )
                .then(response =>
                    Promise.all([
                        // promise für die posts der ersten Seite
                        response.json(),
                        // promise für die totalpages Header der ersten Seite
                        response.headers.get("x-wp-totalpages"),
                    ])
                        // resultat für die posts der ersten Seite
                        // resultat für die totalpages Header der ersten Seite
                        .then(([posts, totalPages]) => {
                            // Array mit allen fetches, die noch gemacht werden sollen.
                            const fetches = [];
                            // page startet bei 2 weil wir die Resultate der ersten Seite ja schon haben
                            for (let page = 2; page <= totalPages; page += 1) {
                                fetches.push(
                                    fetch(
                                        createUrl(base, {
                                            ...getParams,
                                            per_page: perPage,
                                            page,
                                        })
                                    )
                                );
                            }
                            // promise.all führt alle fetches aus
                            Promise.all(fetches)
                                // danach müssen wir den JSON Body von allen fetches holen
                                .then(responses =>
                                    Promise.all(
                                        responses.map(response =>
                                            response.json()
                                        )
                                    )
                                )
                                // dann resolven wir die fetchAllPosts mit einem Array aus allen posts
                                .then(data =>
                                    resolve(
                                        data.reduce(
                                            (acc, data) => [...acc, ...data],
                                            posts
                                        )
                                    )
                                )
                                .catch(e => reject(e));
                        })
                )
                .catch(error => {
                    console.log(error);
                    reject(error);
                });
        });

    useEffect(() => {
        setPartData({
            state: apiStates.LOADING,
        });
        fetchAllPosts()
            .then(posts => {
                setPartData({
                    state: apiStates.SUCCESS,
                    data: posts,
                });
            })
            .catch(error => {
                console.error(error);
                setPartData({
                    state: apiStates.ERROR,
                    error: 'fetch failed',
                });
            });
    }, []);

    return data;
};
