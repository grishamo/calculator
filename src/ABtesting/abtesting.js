const math = require('mathjs');
const configs = require('./test.config.json');

const cookieKey = 'tname';
const isTestParamsMatch = (queryParams, testParams) => {
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
    let base = 100;
    let acceptRequestsNum = percent;
    let gcd = math.gcd(percent, 100);

    acceptRequestsNum /= gcd;
    base /= gcd;

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

class ABTesting {
    constructor(testName) {
        this.testVariant = testName;
    }
    get middleware() {
        return (req, res, next) => {
            this.cookie.value  = req.cookies[cookieKey];
            if (this.cookie.value) {
                return next();
            }

            if (isTestParamsMatch(req.query, this.testConfig.params)) {
                if (isInRange(this.testRequestsConfig)) {
                    this.cookie.value = JSON.stringify(this.testConfig.client);
                }
            }
            next();
        }
    }
    get testName() { return this.title }
    set testVariant(testName) {
        if (testName && configs.hasOwnProperty(testName)) {
            this.testConfig = configs[testName];
            this.title = testName;
            this.testRequestsConfig = numberOfTestRequests(this.testConfig.percentage);
            this.cookie = {key: cookieKey, value: null};
        }
        else {
            throw new Error(testName + ' is not exists in test.config.json');
        }
    }
}

module.exports = ABTesting;
