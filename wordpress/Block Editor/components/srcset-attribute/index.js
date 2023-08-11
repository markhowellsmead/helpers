// Join all of the available sizes together to form a srcset string
const srcSetAttribute = sizes => {
    return Object.entries(sizes)
        .map(([key, entry]) => `${entry.url} ${entry.width}w`)
        .join(', ');
};

export default srcSetAttribute;
