# What's this?

A node cli app to turn on-off and set the temperature on your air conditioner through this IR Remote: https://it.gearbest.com/smart-remote-control/pp_009635988564.html 

# Prerequisites
- The IR Remote :-)
- Node.js
- an account connected to your IR Remote through Tuya app and a developer account (see the readme)

# Usage

1) Create a Developer Account
    - go to https://iot.tuya.com
    - follow this guide to create the app and obtain params: https://docs.tuya.com/en/iot/open-api/quick-start/quick-start1?id=K95ztz9u9t89n

2) Install dependencies and config
    - npm install
    - cp config.js.example config.js
    - insert parameters obtained from the "Create Developer Account" step in config.js

3) Enjoy
    - execute it with `node tuya.js 1 0 22 3`
    - the parameters are the following:
         1) Power - 0: off, 1:on
         2) Mode - 0: cooling, 1: heating, 2: automatic, 3: air supply, 4: dehumidification
         3) Temperature - range 16-31
         4) Wind - 0: automatic, 1: low, 2: medium, 3: high
 
 More info from https://docs.tuya.com/en/iot/open-api/api-list/api/proprietary-category/universal-infrared?id=K9jgsgd7buln4#title-15-Switch%20TV%20channels
