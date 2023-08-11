/**
 * Post selector for Say Hello components
 * mark@sayhello.ch 27.8.2019
 *
 * Usage:
	<PostSelector
		post_type="post"
		attributes={attributes}
		setAttributes={setAttributes}
		label={_x( 'Blogpost auswählen', 'Select field label', 'sha' )}
	/>
 */

import { SelectControl, Spinner } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { Component } from '@wordpress/element';
import { _x } from '@wordpress/i18n';
import { Fragment } from 'react';

class PostSelector extends Component {
    constructor(props) {
        super(...arguments);
        this.props = props;
    }

    setPost(post) {
        const { setAttributes } = this.props;
        setAttributes({ post });
    }

    render() {
        const { attributes, selectOptions, label } = this.props;
        const { post } = attributes;

        return (
            <Fragment>
                {!selectOptions && <Spinner />}
                {!!selectOptions && (
                    <SelectControl
                        label={label}
                        value={post}
                        options={selectOptions}
                        onChange={this.setPost.bind(this)}
                    />
                )}
            </Fragment>
        );
    }
}

export default withSelect((select, props) => {
    const { getEntityRecords } = select('core');

    let posts = getEntityRecords('postType', props.post_type, {
        per_page: -1,
        orderby: 'title',
        order: 'asc',
    });

    if (!posts) {
        return posts;
    }

    let selectOptions = [
        {
            label: _x('Keine Auswahl', 'Default selector label', 'sha'),
            value: '',
        },
    ];

    posts.map(post => {
        selectOptions.push({ value: post.id, label: post.title.raw });
    });

    return {
        selectOptions: selectOptions,
    };
})(PostSelector);
