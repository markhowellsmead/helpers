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
