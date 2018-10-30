const math = require('mathjs');

const percentOptimization = (percent) => {
    const gcd = math.gcd(percent, 100);
    const acceptRequestsNum = percent / gcd;
    const base = 100 / gcd;

    return {
        acceptNum: acceptRequestsNum,
        totalNum: base
    }
}

class TrafficFilters {

    constructor(data) {
        this.configs = data;
        this.trafficPercentage = percentOptimization(data.percentage || 100);
        this.filtersMap = {
            percentage: this.percentageFilter.bind(this),
            params: this.paramsFilter.bind(this)
        };

        return this.currentFilters();
    }

    percentageFilter(){
        // In order to serve all request with equal probability
        // we must find random number between total requests and 1,
        // and return true if this number is lower or equal to number of accepted request
        let rand =  Math.floor(Math.random() * this.trafficPercentage.totalNum) + 1;
        const returnBool = rand <= this.trafficPercentage.acceptNum;
        console.info('percentage filter: ' + returnBool);
        return returnBool;
    };

    paramsFilter(req){
        const queryParams = req.query;
        const configParams = this.configs.params;
        let returnBool = Object.keys(configParams).length <= 0;

        Object.keys(queryParams).forEach(key => {
            if(configParams.hasOwnProperty(key)) {
                if(queryParams[key] === configParams[key]){
                    returnBool = true;
                } else {
                    return false;
                }
            }
        });
        console.info('params filter: ' + returnBool);
        return returnBool;
    };


    currentFilters(){
        let currentFilters = {};
        Object.keys(this.configs).forEach(item => {
            if(this.filtersMap.hasOwnProperty(item)) {
                currentFilters[item] = this.filtersMap[item];
            } else {
                console.error(`ERROR: filter ${item} not exist`);
            }
        });
        return currentFilters;
    }
}

module.exports = TrafficFilters;
