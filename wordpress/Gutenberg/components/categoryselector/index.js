/**
 * Usage:
 <CategorySelector
		category={attributes.category}
		onChange={category => setAttributes({ category });
    }}/>
 *
 * mark@sayhello.ch - this version since January 2023
*/ 

import { _x } from '@wordpress/i18n';
import { Spinner, TreeSelect } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { groupBy } from 'lodash';

const CategorySelector = ({ category, onChange }) => {
    const { categories } = useSelect(select => {
        return {
            categories: select('core').getEntityRecords('taxonomy', 'category'),
        };
    });

    if (!categories) {
        return <Spinner />;
    }

    function buildTermsTree(flatTerms) {
        const termsByParent = groupBy(flatTerms, 'parent');
        const fillWithChildren = terms => {
            return terms.map(term => {
                const children = termsByParent[term.id];

                return {
                    ...term,
                    children: children && children.length ? fillWithChildren(children) : [],
                };
            });
        };

        return fillWithChildren(termsByParent['0'] || []);
    }

    const options = buildTermsTree(categories);

    return (
        <TreeSelect
            label={_x('Kategorie auswählen', 'Select field label', 'sht')}
            selectedId={category}
            onChange={onChange}
            tree={options}
        />
    );
};

export default CategorySelector;
