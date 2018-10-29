const math = require('mathjs');
const configs = {
    variantA: {
        percentage: 100,
        params: {
            country: 'us'
        }
    },
    variantB: {
        percentage: 45,
        params: {
            country: 'us'
        }
    }
};

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

    constructor(variant) {
        this.testVariant = variant;
    }

    get middleware() {
        return (req, res, next) => {
            if (isTestParamsMatch(req.query, this.test.params)) {
                if (isInRange(this.testRequestsConfig)) {
                    next()
                } else {
                    next('route')
                }
            } else {
                next('route');
            }
        }
    }

    set testVariant(testName) {
        if (testName && configs.hasOwnProperty(testName)) {
            this.test = configs[testName];
            this.testRequestsConfig = numberOfTestRequests(this.test.percentage);
        }
        else {
            throw new Error(testName + ' is not exists in test.config.json');
        }
    }
}

module.exports = ABTesting;
