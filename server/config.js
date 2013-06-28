module.exports = {
  "development": false,
  "dev": {
    "http": {
      "host": "0.0.0.0",
      "port": 8080
    },
    "socket": {
      "host": "0.0.0.0",
      "port": 8081,
      "log_level": 2
    },
    "singly": {
      "host": "localhost",
      "client_id": "",
      "client_secret": ""
    },
    "facebook": {
      "appId": "157146351116523",
      "appSecret": "c03e4af81d1af574454d8046498ff65c"
    },
    "switches": {
      "development": "",
      "geocode": "on",
      "mobozi": "on",
      "fb": "on"
    },
    "balanced": {
      "host": 'api.balancedpayments.com',
      "username": "21417798be9f11e2a455026ba7d31e6f",
      "password": "",
      "uriHash": "TEST-MP10W5MeM4KalqmMcCekJlMq"
    }
  },
  "prod": {
    "http": {
      "host": "0.0.0.0",
      "port": 8080
    },
    "socket": {
      "host": "www.lynd.me",
      "port": 8081,
      "log_level": 0
    },
    "singly": {
      "host": "https://api.singly.com",
      "client_id": "d1ef129e82a2a0c45959cb522d9b5cb1",
      "client_secret": "c740b1ba3c1b85fcc946b73b79091798"
    },
    "facebook": {
      "appId": "484130828317063",
      "appSecret": "2665b28425cde891652cda029258e900"
    },
    "switches": {
      "development": "",
      "geocode": "on",
      "mobozi": "on",
      "fb": "on"
    },
    "balanced": {
      "host": 'api.balancedpayments.com',
      "username": "21417798be9f11e2a455026ba7d31e6f",
      "password": "",
      "uriHash": "TEST-MP10W5MeM4KalqmMcCekJlMq"
    }
  },
  "current": function () {
    return this.development ? this.dev : this.prod
  }
}