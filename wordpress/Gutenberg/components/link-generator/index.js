/**
 * Create an HTML link tag using the specified block attributes.
 * Author mark@sayhello.ch
 *
 * Usage in the block's save() function:
 
 const {rel, linkTarget, label, url} = props.attributes;
 
 <Link
	rel={rel}
	linkTarget={linkTarget}
	label={label}
	url={url}
	className={`o-cardlink`}
	/>

 *
 */

const Link = props => {
    const { label, linkTarget, rel, url, className } = props;

    const linkAttributes = {
        href: url,
        className: className,
    };

    if (!!rel) {
        linkAttributes.rel = rel;
    }

    if (!!linkTarget) {
        linkAttributes.target = linkTarget;
    }

    return <a {...linkAttributes} dangerouslySetInnerHTML={{ __html: label }} />;
};

export default Link;
