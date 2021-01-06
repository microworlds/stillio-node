# Stillio

Official SDK for interacting with the Stillio API


## Introduction
This SDK is for interacting with the webpages and screenshots stored on the Stillio platform. This reference outlines version 3 of the API.

## Prerequisite
1. [Create a free Stillio account]("https://app.stillio.com/register")
2. [Create an API token]("https://app.stillio.com/settings#/api") from your dashboard

## Installation
```bash
npm install --save stillio-node
```

## Usage
```js
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
## Documentation
The complete API documentation can be found here: [Stillio API Docs]("https://api.stillio.com/v3/docs/api.html")