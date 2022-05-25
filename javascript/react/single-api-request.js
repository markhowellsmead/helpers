import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { getPosts } from '../_components/api-handler';
import { apiStates } from '../_components/api-states';

const classNameBase = 'wp-block-sht-status-lamp';

const App = ({ element }) => {
    const { statusLamp } = element.dataset;

    const endpoint = `${sht_wp_api.root}sht/v1/settings/berghaus_bahn`;

    const { state, data, doRequest } = getPosts(endpoint);

    useEffect(() => {
        // Give me a ping, Vasili. One ping only, please.
        doRequest();
    }, []);

    if (!data) {
        return '';
    }

    switch (state) {
        case apiStates.IDLE:
            return '';

        case apiStates.LOADING:
            return '';

        case apiStates.ERROR:
            console.error(error);
            return '';

        case apiStates.SUCCESS:
            let lamp_text, lamp_class;

            switch (statusLamp) {
                case 'bahn':
                    if (!!data.railway_in_service) {
                        lamp_text = sht_scripts.translations.bahn_inservice;
                        lamp_class = 'on';
                    } else {
                        lamp_text = sht_scripts.translations.bahn_notinservice;
                        lamp_class = 'off';
                    }
                    break;
                case 'berghaus':
                    if (!!data.berghaus_open) {
                        lamp_text = sht_scripts.translations.berghaus_open;
                        lamp_class = 'on';
                    } else {
                        lamp_text = sht_scripts.translations.berghaus_closed;
                        lamp_class = 'off';
                    }
                    break;
            }

            return (
                <div
                    className={`${classNameBase}__content ${classNameBase}__content--${lamp_class}`}
                    dangerouslySetInnerHTML={{ __html: lamp_text }}
                />
            );
    }
};

const elements = document.querySelectorAll('[data-status-lamp]');

if (!!elements && !!elements.length) {
    elements.forEach(element => {
        ReactDOM.render(<App element={element} />, element);
    });
}
