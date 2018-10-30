Forked from: https://github.com/ahfarmer/calculator


Calculator
---
Simple React + Redux calculator with Express server.
This project is for learning purposes only, used as a base project to add features / refactoring.

The project
---
This project is a simple React + Redux app.<br>
The server is an express app (src/server.js)<br>

How to run the project
---
```shell
git clone https://github.com/reisel/calculator.git
cd calculator
npm install
npm start
```

Test Json
---
```
{
  "variantA": {
    "server": {
      "percentage": 100,
      "params": {
        "country": "us"
      }
    },
    "client": {
      "buttonsColor" : "#40a0e0",
      "buttonsOrder" : "+,÷,-,x,="
    }
  },
  "variantB": {
    "server": {
      "params": {
        "country": "il"
      }
      "percentage": 50,
    },
    "client": {
      "buttonsOrder" : "=,÷,x,-,+"
    }
  }
}
```

## `server: Object`
Configuration object for the server<br>
The keys of this object represents possible traffic filters

#### Filters:
`percentage: Number`<br>
Apply test only for some percentage of the traffic, possible values: 1 - 100 

`params: Object`<br>
Apply the test only for the request with query params that matches the params object

## `client: Object`
The changes that must by applied for the client, in the client.<br>
Server is sending ths object in a cookie to the client.<br>

#### Options:
`buttonsColor: Hex String`  - The color of the math operator buttons.<br>
`buttonsOrder: String` - The order of the math operator icons.
