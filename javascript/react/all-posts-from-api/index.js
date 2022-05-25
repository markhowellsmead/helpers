import React, { useEffect, useState } from 'react';

import { apiStates } from '../_components/api-states';

export const apiGetPostList = (base, getParams = {}, perPage = 20) => {
    const [data, setData] = useState({
        state: apiStates.LOADING,
        error: '',
        data: [],
    });

    const setPartData = partialData => setData({ ...data, ...partialData });

    const createUrl = (base, params) => {
        const paramsArray = Object.entries(params).map(([key, value]) => `${key}=${value}`);
        return `${base}?${paramsArray.join('&')}`;
    };

    const fetchAllPosts = () =>
        new Promise((resolve, reject) =>
            // Load the page
            fetch(
                createUrl(base, {
                    ...getParams,
                    per_page: perPage,
                })
            )
                .then(response =>
                    Promise.all([
                        // Promise for the posts on the first page
                        response.json(),
                        // Promise for the total number of pages via header on the first request
                        response.headers.get('x-wp-totalpages'),
                    ])
                        .then(([posts, totalPages]) => {
                            console.log(totalPages);
                            // Array to contain all request responses
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
                            // promise.all executes all fetches
                            Promise.all(fetches)
                                // Get the JSON body of each response
                                .then(responses =>
                                    Promise.all(responses.map(response => response.json()))
                                )
                                // Resolve fetchAllPosts to an array of all posts
                                .then(data =>
                                    resolve(data.reduce((acc, data) => [...acc, ...data], posts))
                                )
                                .catch(e => reject(e));
                        })
                )
                .catch(e => reject(e))
        );

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
            .catch(() => {
                setPartData({
                    state: apiStates.ERROR,
                    error: 'fetch failed',
                });
            });
    }, []);

    return data;
};

/**
 * Usage in the Component:

 const { state, data } = apiGetPostList(
        `${sht_preact.api.root}wp/v2/sht_species/`,
        {
            //species_id: 4,
        },
        100
    );

    console.log(data);

 */
