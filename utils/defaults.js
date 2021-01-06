// Sets default options. Inspired by the accounting.js library
// https://github.com/openexchangerates/accounting.js/blob/74a2b12800f0483ffeebf05c00ea52f8dde3ac07/accounting.js#L80
function defaults(options, defs){
    options = options || {}
    
    // Ensure default options are passed
    if (!defs) {
        throw new Error("Default options must be supplied")
    }

    // Iterate over all default options non-prototypal properties and compare against the options passed
    for (let key in defs) {
        if (defs.hasOwnProperty(key)) {
            if (key in options !== true) {
                options[key] = defs[key]
            }
        }
    }

    return options
}

module.exports = defaults