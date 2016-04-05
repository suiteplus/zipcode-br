var fs = require('fs');
var arrayZipBand = [];
var arrayParsedZipcodeBr;
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var router = express.Router();

var opts = {
    zipBand: './DELTA_LOG_FAIXA_LOC.TXT',
    location: './DELTA_LOG_LOCALIDADE.TXT',
    config: 0
}

 router.get('/', function(req, res, opts) {
     

  if (opts.zipBand.constructor != Array) {
    opts.zipBand = [opts.zipBand];
  }
  if (opts.location.constructor != Array) {
    opts.location = [opts.location];
  }

  if (opts.config === "0") {
    for (var i = 0; i < opts.zipBand.length; i++) {
      fs.readFile(opts.zipBand[i], 'utf8', function(err, logData) {


        if (err) throw err;

        var text = logData.toString();
        decodeURIComponent(text);

        var lines = text.split('\n');

        lines.forEach(function(line) {
          var parts = line.split('@');

          if (parts[1] != undefined) {
            var obJson = {
              LOC_CEP_INI: parts[1],
              LOC_CEP_FIM: parts[2]

            }
            arrayZipBand.add(obJson);
          }

        });


      });

      fs.readFile(opts.location, 'utf8', function(err, logData) {


        if (err) throw err;

        var text = logData.toString();
        decodeURIComponent(text);

        var lines = text.split('\n');

        lines.forEach(function(line) {
          var parts = line.split('@');

          if (parts[1] != undefined) {
            for (var i = 0; i < arrayZipBand.length; i++) {
              var obJson = {
                LOC_NU: parts[0],
                UFE_SG: parts[1],
                LOC_NO: parts[2],
                MUN_NU: parts[8],
                LOC_CEP_INI: arrayZipBand[i].LOC_CEP_INI,
                LOC_CEP_FIM: arrayZipBand[i].LOC_CEP_FIM
              }
              arrayParsedZipcodeBr.add(obJson);

            }
          }


        });
      });

    }
    return arrayParsedZipcodeBr;

  };
})


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});

