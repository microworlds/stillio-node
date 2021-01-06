const axios = require('axios');
const defaults = require('./utils/defaults')

const BASE_URL = `https://api.stillio.com/v3`
const REQ_TIMEOUT = 1000 * 30

// The Stillio API client
let Stillio = {}

// Webpages

/** 
 * Get a webpage by Id
 * 
 * @param {Text}  options.webpageId Id of the webpage you want to get. Required: true.
 * @param {Text} options.timeout Duration to timeout the API call. Default: 30 seconds Required: false
 * 
 *  @returns {Promise<StillioAPIResponse>}
 */
Stillio.getWebpage = async function(options){

    let token = this.token
    
    // Sanity checks
    if (!options.webpageId) {
        throw new Error("The webpageId is required")
    }

    if (!options.timeout) {
        options.timeout = REQ_TIMEOUT
    }

    if (typeof options.timeout !== "number") {
        throw new Error("Invalid argument, please provide a Number type")
    }
    
    try {
        const response = await axios({
            method: 'GET',
            url: `${BASE_URL}/webpages/${options.webpageId}`,
            headers: {
                'Authorization': `${token}`,
                'Accept': `application/json`
            },
            responseType: 'json',
            timeout: options.REQ_TIMEOUT
        })

        return response
    } catch (error) {
        if (error.response) {
            return error.response
        }
        throw error
    }
}

/**
 * Get webpages
 * 
 * @param {Number}  options.page Page index. Default: 1.
 * @param {Number} options.limit Number of items per page (between 1 and 100). Default: 50. Required: false
 * @param {Number} options.timeout Duration to timeout the API call. Default: 30 seconds. Required: false
 * @param {Text} options.sort Field to sort the items by. Default: isPartOf.name. Possible values : (dateCreated, isPartOf.name, name, url). Required: false
 * @param {Text} options.order Sorting direction of the items: ascending or descending. Default: asc Possible values : (asc, desc). Required: false
 * 
 * @returns {Promise<StillioAPIResponse>}
 */
Stillio.getWebpages = async function(options) {

    let token = this.token
    
    // Define default Query string parameters
    let defaultOptions = {
        page: 1,
        limit: 50,
        timeout: REQ_TIMEOUT,
        sort: "isPartOf.name",
        order: "asc"
    }

    // Get Query string parameters from client
    let clientOptions = defaults(options, defaultOptions)

    // Build request url from Query string parameters
    let url = `${BASE_URL}/webpages?page=${clientOptions.page}&limit=${clientOptions.limit}&sort=${clientOptions.sort}&order=${clientOptions.order}`

    // Make actual API call
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            headers: {
                'Authorization': `${token}`,
                'Accept': `application/json`
            },
            responseType: 'json',
            timeout: clientOptions.REQ_TIMEOUT
        })

        return response
    } catch (error) {
        if (error.response) {
            return error.response
        }
        throw error
    }
}


// Screenshots

/** 
 * Get a screenshot by Id
 * 
 * @param {Text}  options.webpageId Id of the webpage you want to get. Required: true.
 * @param {Text}  options.screenshotId Id of the screenshot you want to get. Required: true.
 * @param {Number} options.timeout Duration to timeout the API call. Default: 30 seconds Required: false
 * 
 *  @returns {Promise<StillioAPIResponse>}
 */
Stillio.getScreenshot = async function(options){

    let token = this.token
    
    // Sanity checks
    if (!options.webpageId) {
        throw new Error("The webpageId is required")
    }

    if (!options.screenshotId) {
        throw new Error("The screenshotId is required")
    }

    if (!options.timeout) {
        options.timeout = REQ_TIMEOUT
    }

    if (typeof options.timeout !== "number") {
        throw new Error("Invalid argument, please provide a Number type")
    }
    
    try {
        const response = await axios({
            method: 'GET',
            url: `${BASE_URL}/webpages/${options.webpageId}/screenshots/${options.screenshotId}`,
            headers: {
                'Authorization': `${token}`,
                'Accept': `application/json`
            },
            responseType: 'json',
            timeout: options.REQ_TIMEOUT
        })

        return response
    } catch (error) {
        if (error.response) {
            return error.response
        }
        throw error
    }
}


/**
 * Get screenshots
 * 
 * @param {Number}  options.page Page index. Default: 1. Required: false
 * @param {Number} options.limit Number of items per page (between 1 and 100). Default: 50. Required: false
 * @param {Number} options.timeout Duration to timeout the API call. Default: 30 seconds. Required: false
 * @param {Text} options.sort Field to sort the items by. Default: dateCreated. Possible values : (dateCreated). Required: false
 * @param {Text} options.order Sorting direction of the items: ascending or descending. Default: asc. Possible values : (asc, desc). Required: false
 * @param {Text}  options.webpageId Id of the webpage you want to get. Required: true.
 * 
 * @returns {Promise<StillioAPIResponse>}
 */
Stillio.getScreenshots = async function(options) {

    // Sanity checks
    if (!options.webpageId) {
        throw new Error("The webpageId is required")
    }

    let token = this.token
    
    // Define default Query string parameters
    let defaultOptions = {
        page: 1,
        limit: 50,
        timeout: REQ_TIMEOUT,
        sort: "dateCreated",
        order: "desc",
        webpageId: null
    }

    // Get Query string parameters from client
    let clientOptions = defaults(options, defaultOptions)

    // Build request url from Query string parameters
    let url = `${BASE_URL}/webpages/${clientOptions.webpageId}/screenshots?page=${clientOptions.page}&limit=${clientOptions.limit}&sort=${clientOptions.sort}&order=${clientOptions.order}`

    // Make actual API call
    try {
        const response = await axios({
            method: 'GET',
            url: url,
            headers: {
                'Authorization': `${token}`,
                'Accept': `application/json`
            },
            responseType: 'json',
            timeout: clientOptions.REQ_TIMEOUT
        })

        return response
    } catch (error) {
        if (error.response) {
            return error.response
        }
        throw error
    }
}


// General information

/** 
 * Get API context information
 * 
 *This endpoint returns contextual information about the API and does not require authentication. You usually only need this information if your application uses Linked Data.
 * 
 * @param {Number} options.timeout Duration to timeout the API call. Default: 30 seconds. Required: false 
 * 
 * @returns {Promise<StillioAPIResponse>}
 */
Stillio.getAPIContextInfo = async function(options){

    if (!options) {
        options = {}
        options.timeout = REQ_TIMEOUT
    }

    if (typeof options.timeout !== "number") {
        throw new Error("Invalid argument, please provide a Number type")
    }
    
    try {
        const response = await axios({
            method: 'GET',
            url: `${BASE_URL}/contexts`,
            headers: {
                'Accept': `application/json`
            },
            responseType: 'json',
            timeout: options.REQ_TIMEOUT
        })

        return response
    } catch (error) {
        if (error.response) {
            return error.response
        }
        throw error
    }
}

module.exports = function(token) {

    if (!token) {
        throw new Error("Authorization token required")
    }

    Stillio.token = token;
    return Stillio;
};