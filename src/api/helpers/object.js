function has(obj, key) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) return true;
    return false;
}

function missing_keys(record, keys) {
    const missing = [];
    for (const key of keys) {
        if(!has(record, key)) missing.push(key);
    }
    return missing;
}

module.exports = missing_keys;