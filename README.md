# Recruiting Hooks
[![Build Status](https://travis-ci.org/vitorsalgado/recruiting-hooks.svg?branch=master)](https://travis-ci.org/vitorsalgado/recruiting-hooks)  

**Node.js** API dedicated to listen incoming Web Hooks from GitHub **open** Pull Requests to do two tasks:
* Notify a new code challenge arrival in a **Slack Channel**
* Set a default **label** in the newly opened Pull Request from code challenge submission. Eg.: set **pending review** label in the new PR

## Deploy to Heroku
Use the button below to easily deploy this application to **Heroku**.  
Check [sample.env](./examples/sample.env) for more details about all required environment variables you need.  
 
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
