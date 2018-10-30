const math = require('mathjs');
const allConfigs = require('./test.config.json');

const cookieKey = 'tname';
const isQueryParamsMatch = (queryParams, testParams) => {
    let returnValue = false;
    Object.keys(queryParams).forEach(key => {
        if(testParams.hasOwnProperty(key)) {
            if(queryParams[key] === testParams[key]){
                returnValue = true;
            } else {
                return false;
            }
        }
    });
    return returnValue;
};
const numberOfTestRequests = (percent) => {
    const gcd = math.gcd(percent, 100);
    const acceptRequestsNum = percent / gcd;
    const base = 100 / gcd;

    return {
        acceptNum: acceptRequestsNum,
        totalNum: base
    }
};
const isInRange = (configs) => {
    // In order to serve all request with equal probability
    // we must find random number between total requests and 1,
    // and return true if this number is lower or equal to number of accepted request
    let rand =  Math.floor(Math.random() * configs.totalNum) + 1;
    return rand <= configs.acceptNum;
};
const stringifyCookieValue = (data) => {
    let returnValue = data || {};
    return JSON.stringify(returnValue);
};
const validateConfig = (testName, cb) => {
    // TODO use 'jsonschema' or similar library for proper json validation
    const errorMessage = `ERROR: ${testName} has invalid configurations`;
    const isValid = (testName &&
        allConfigs.hasOwnProperty(testName) &&
        allConfigs[testName].server
    );

    if (!isValid) {
        cb({message: errorMessage})
    } else {
        cb(null)
    }
};

class ABTesting {
    constructor(testName) {
        this.testConfigs = testName;
    }
    get middleware() {
        return (req, res, next) => {
            if(!this.error) {
                const cookie = req.universalCookies.get(cookieKey);
                this.cookie.value = stringifyCookieValue(cookie);

                if (!cookie) {
                    let isPassTest = Object.keys(this.config.server).every(item => this.isTestPass(item, req));
                    if (isPassTest) {
                        console.log('Test Pass');
                        this.cookie.value = stringifyCookieValue(this.config.client);
                    }
                }

                res.cookie(this.cookie.key, this.cookie.value);
            }
            next();
        }
    }

    isTestPass(item, req) {
        let returnBool = false;
        switch (item) {
            case "percentage":
                returnBool = isInRange(this.testRequestsConfig);
                break;
            case "params":
                returnBool = isQueryParamsMatch(req.query, this.config.server.params);
        }
        return returnBool;
    }

    set testConfigs (testName) {
        validateConfig(testName, err => {
            if(err) {
                this.error = err;
                console.error(err.message);
                return;
            }

            this.config = allConfigs[testName];
            this.testRequestsConfig = numberOfTestRequests(this.config.server.percentage);
            this.cookie = {key: cookieKey, value: stringifyCookieValue(null)};
        })
    }
}

module.exports = ABTesting;
