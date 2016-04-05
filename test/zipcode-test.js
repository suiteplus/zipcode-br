'use strict';

var fs = require('fs'),
    zipcodebr = require('../index.js'),
  


opts = {
    zipBand: './DELTA_LOG_FAIXA_LOC.TXT',
    location: './DELTA_LOG_LOCALIDADE.TXT',
    config: 0
}

try {
    var test = zipcodebr.parse(opts);
    
    
}
catch (e) {
    
}