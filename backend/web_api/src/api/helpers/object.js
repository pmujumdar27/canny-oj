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

function empty_strings(record, keys) {
    const empty = [];
    for (const key of keys) {
        if(record[key].trim() === "") empty.push(key);
    }
    return empty;
}

function accept(obj, keys) {
	return Object.keys(obj)
		.filter(k => keys.includes(k))
		.map(k => Object.assign({}, { [k]: obj[k] }))
		.reduce((res, o) => Object.assign(res, o), {});
}

function reject(obj, keys) {
	return Object.keys(obj)
		.filter(k => !keys.includes(k))
		.map(k => Object.assign({}, { [k]: obj[k] }))
		.reduce((res, o) => Object.assign(res, o), {});
}

module.exports = {
    missing_keys,
    empty_strings,
    accept,
    reject,
    has
};