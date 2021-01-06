# Stillio

Node SDK for interacting with the Stillio API

## Introduction

This SDK is for interacting with the `webpages` and `screenshots` stored on the Stillio platform. This reference outlines version 3 of the API.

## Prerequisite

1. [Create a free Stillio account](https://app.stillio.com/register)
2. [Create an API token](https://app.stillio.com/settings#/api) from your dashboard

## Installation

```bash
npm install --save stillio-node
```

## Usage

```js
// Initialize your stillio API client and pass the secret token. Note: Store this key in an env variable when in production environment
let stillio = require('stillio-node')(YOUR_STILLIO_API_TOKEN)

(async () => {
    try {
        let webpages = await stillio.getWebpages({
            limit: 56,
            order: "desc"
        })

        console.log(webpages)
    } catch (error) {
        console.log(error)
    }
})()
```

## Examples

### stillio.getWebpage([config])

Sample usage:
```js
(async () => {
    try {
        let webpage = await stillio.getWebpage({
            webpageId: "some-kind-of-webpage-id-here",
            timeout: 15000
        })

        console.log(webpage)
    } catch (error) {
        console.log(error)
    }
})()
```

Sample Response:
```json
{
    "type": "WebPage",
    "id": "https://api.stillio.com/v3/webpages/{webpageId}",
    "identifier": "{webpageId}",
    "name": "Some page",
    "url": "http://www.example.org/somePage.html?q=a",
    "dateCreated": "2019-01-29T11:24:58.743Z",
    "dateModified": "2019-01-29T11:24:58.743Z",
    "subjectOf": {
        "type": "Collection",
        "id": "https://api.stillio.com/v3/webpages/{webpageId}/screenshots"
    },
    "isPartOf": {
        "type": "WebPageGroup",
        "name": "example.org"
    },
    "collection": "https://api.stillio.com/v3/webpages"
}
```

### stillio.getScreenshots([config])

Sample usage:
```js
(async () => {
    try {
        let screenshots = await stillio.getScreenshots({
            webpageId: "some-kind-of-webpage-id-here",
            page: 1,
            limit: 25,
            timeout: 20000,
            sort: "dateCreated",
            order: "asc"
        })

        console.log(screenshots)
    } catch (error) {
        console.log(error)
    }
})()
```

Sample Response:
```json
{
    "type": "Collection",
    "id": "https://api.stillio.com/v3/webpages/{webpageId}/screenshots",
    "totalItems": 123,
    "members": [
        {
            "type": "ImageObject",
            "id": "https://api.stillio.com/v3/webpages/{webpageId}/screenshots/{screenshotId}",
            "identifier": "{screenshotId}",
            "dateCreated": "2019-01-29T11:23:58.624Z",
            "dateModified": "2019-01-29T11:24:58.743Z",
            "contentUrl": "https://stillio-hosting/path/to/image.png",
            "encodingFormat": "image/png",
            "thumbnail": {
                "type": "ImageObject",
                "contentUrl": "https://stillio-hosting/path/to/thumbnail.png",
                "encodingFormat": "image/png"
            },
            "about": {
                "type": "WebPage",
                "id": "https://api.stillio.com/v3/webpages/{webpageId}"
            }
        },
        // ...
    ],
    "view": {
        "type": "PartialCollectionView",
        "id": "https://api.stillio.com/v3/webpages/{webpageId}/screenshots?page=3",
        "first": "https://api.stillio.com/v3/webpages/{webpageId}/screenshots?page=1",
        "previous": "https://api.stillio.com/v3/webpages/{webpageId}/screenshots?page=2",
        "next": "https://api.stillio.com/v3/webpages/{webpageId}/screenshots?page=4",
        "last": "https://api.stillio.com/v3/webpages/{webpageId}/screenshots?page=15"
    }
}
```

## Supported Resources

### Webpages

1. `stillio.getWebpage([config])`: Get a single webpage by Id
    - `config`: is an object with the following properties:
        - `webpageId`: Id of the webpage you want to get. Required - `true`
        - `timeout`: Duration to timeout the request in milliseconds. Defaults to `30000`. Required - `false`

2. `stillio.getWebpages([, config])`: Get all webpages
    - `config`: is an optional object with the following properties:
        - `page`:  Page index. Default: `1`
        - `limit`:  Number of items per page. Default: `50`
        - `timeout`: Duration to timeout the request in milliseconds. Defaults to `30000`
        - `sort`: Field to sort the items by. Default: `isPartOf.name`. Possible values: `dateCreated`, `isPartOf.name`, `name`, `url`
        - `order`: Sorting direction of the items: ascending or descending. Default: `asc`. Possible values: `asc`, `desc`

### Screenshots

1. `stillio.getScreenshot([config])`: Get a single screenshot by Id
    - `config`: is an object with the following properties:
        - `webpageId`: Id of the webpage you want to get. Required: `true`
        - `screenshotId`: Id of the screenshot you want to get. Required: `true`
        - `timeout`: Duration to timeout the request in milliseconds. Defaults to `30000`. Required: `false`

2. `stillio.getScreenshots([config])`: Get all screenshots
    - `config`: is an optional object with the following properties:
        - `webpageId`: Id of the webpage you want to get. Required: `true`. (Note: It is the only `required` property in the `config` object)
        - `page`:  Page index. Default: `1`
        - `limit`:  Number of items per page. Default: `50`
        - `timeout`: Duration to timeout the request in milliseconds. Defaults to `30000`
        - `sort`: Field to sort the items by. Default: `dateCreated`. Possible values: `dateCreated`
        - `order`: Sorting direction of the items: ascending or descending. Default: `desc`. Possible values: `asc`, `desc`

### General information

1. `stillio.getAPIContextInfo([, config])`: This endpoint returns contextual information about the API and does not require authentication. You usually only need this information if your application uses Linked Data
    - `config`: is an optional object with the following property:
        - `timeout`: Duration to timeout the request in milliseconds. Defaults to `30000`

## Documentation

The complete API reference can be found here: [Stillio API Docs](https://api.stillio.com/v3/docs/api.html)

## Contributing

Feel free to contribute to this package :smile: