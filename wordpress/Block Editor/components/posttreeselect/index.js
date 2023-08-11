/**
 * Hierarchical Post selector for Say Hello components
 * Requires the “terms” util.
 * mark@sayhello.ch 12.1.2023
 *
 * output: 'select' (SelectControl), otherwise TreeSelect
 *
 * Usage:
 <PostTreeSelect
 	postType="sht_proissue"
 	orderBy="menu_order"
 	attributes={attributes}
 	setAttributes={setAttributes}
 	label={_x( 'Hauptausgabe auswählen', 'Select field label', 'sha' )}
    query={{search:'Hello'}}
    output={'select'}
 />
 */

import { _x } from '@wordpress/i18n';
import { SelectControl, Spinner, TreeSelect } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { Component } from '@wordpress/element';

import { buildTermsTree } from '../../_utils/terms/';

class PostSelector extends Component {
    constructor(props) {
        super(...arguments);
        this.props = props;
    }

    render() {
        const { attributes, selectOptions, setAttributes, label, attributeKey, output } =
            this.props;

        const attribute_key = attributeKey || 'post';

        if (!selectOptions) {
            return <Spinner />;
        } else {
            if (output === 'select') {
                const options = selectOptions.map(item => ({
                    value: item.id,
                    label: item.title,
                }));

                return (
                    <SelectControl
                        label={label}
                        value={attributes[attribute_key]}
                        options={options}
                        onChange={post => {
                            setAttributes({ [attribute_key]: post });
                        }}
                    />
                );
            } else {
                const treeMap = selectOptions.map(item => ({
                    id: item.id,
                    parent: item.parent,
                    name: item.title,
                }));

                console.log(treeMap);

                const treeOptions = buildTermsTree(treeMap);

                return (
                    <TreeSelect
                        label={label}
                        tree={treeOptions}
                        selectedId={attributes[attribute_key]}
                        onChange={post => {
                            setAttributes({ [attribute_key]: post });
                        }}
                    />
                );
            }
        }
    }
}

export default withSelect((select, props) => {
    const { getEntityRecords } = select('core');
    const { orderBy, toplevel, postType, query } = props;

    const order_by = orderBy || 'menu_order';

    const queryArgs = {
        per_page: 100,
        order_by: order_by,
        order: 'asc',
    };

    let queryArgsMerged = {
        ...queryArgs,
        ...query,
    };

    // Only posts with no parent
    if (!!toplevel) {
        queryArgsMerged.parent = 0;
    }

    let posts = getEntityRecords('postType', postType, queryArgsMerged);

    if (!posts) {
        return posts;
    }

    let selectOptions = [
        {
            id: '',
            parent: 0,
            title: _x('Keine Auswahl', 'Default selector label', 'sha'),
        },
    ];

    posts.map(post => {
        selectOptions.push({
            id: post.id,
            parent: post.parent,
            title: post.title.rendered
                ? post.title.rendered
                : `#${item.id} (${__('Kein Titel', 'sha')})`,
        });
    });

    return { selectOptions };
})(PostSelector);
