const arrayObjectDuplicateRemove = (arr, key) => {
    const ids = arr.map((o) => {
        return o[key];
    });
    const filtered = arr.filter((item, index) => {
        return !ids.includes(item[key], index + 1);
    });

    return filtered;
};

module.exports = {
    arrayObjectDuplicateRemove,
};
