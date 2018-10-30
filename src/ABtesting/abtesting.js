const allConfigs = require('./test.config.json');
const TrafficFilters = require('./traficFilters');

const cookieKey = 'tname';
const stringifyCookieValue = (data) => {
    let returnValue = data || {};
    return JSON.stringify(returnValue);
};
const validateConfig = (testName, cb) => {
    // TODO use 'jsonschema' or similar library for json validation
    const errorMessage = `ABTesting ERROR: ${testName}: invalid configurations`;
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
                    let isPassTest = Object.keys(this.config.server).every(item => this.trafficFilters[item](req));
                    if (isPassTest) {
                        this.cookie.value = stringifyCookieValue(this.config.client);
                    }
                }
                res.cookie(this.cookie.key, this.cookie.value);
            }
            next();
        }
    }
    set testConfigs (testName) {
        validateConfig(testName, err => {
            if(err) {
                this.error = err;
                console.error(err.message);
                return;
            }
            this.config = allConfigs[testName];
            this.cookie = {key: cookieKey, value: stringifyCookieValue(null)};
            this.trafficFilters = new TrafficFilters(this.config.server);
        })
    }
}

module.exports = ABTesting;
