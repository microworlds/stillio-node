// Sets default options. Inspired by accounting js
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