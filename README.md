# zipcode-br 
[![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url]

## Required
 * node.js 4 +

## Install [![Dependency Status][david-image]][david-url][![devDependency Status][david-image-dev]][david-url-dev]
```bash
    npm install suiteplus/zipcode-br --save
```

## Functionality

Create a json array of zipcodes from brazil using DNE (diretório nacional de endereços) files.

## Usage

Create a json object with zipBand, location and config.

```javascript
 var opts = {
        zipBand: './files/DELTA_LOG_FAIXA_LOC.txt',
        location: './files/DELTA_LOG_LOCALIDADE.txt',
        config: 0
    }
```
  
|     Param     	| Type   	| Description                                                                                                                                                                                |
|:-------------:	|--------	|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	                                                                             |
| opts.config   	| string 	| Set it to 0 if you want search files with separators(@) or 1 if you want the fixed.                                                                                                        |
| opts.zipBand  	| string 	| It's the path to zipcode band if you set opts.config to 0 will be DELTA_LOG_FAIXA_LOC.TXT if 1 DNE_DLT_FAIXAS_CEP_LOCALIDADE.TXT. It can be a array of paths or only a string to the path. |
| opts.location 	| string 	| The same as zipBand but for the file DELTA_LOG_LOCALIDADE.txt if opts.config = 0 and DNE_DLT_LOCALIDADES.TXT if opts.config = 1. Can be a array to                                         |


Call the function.parse() passing the json to parse the files.
example:

```javascript
    zipcode.parse(opts);
```

[travis-url]: https://travis-ci.org/suiteplus/zipcode-br
[travis-image]: https://img.shields.io/travis/suiteplus/zipcode-br.svg

[coveralls-url]: https://coveralls.io/r/suiteplus/zipcode-br
[coveralls-image]: http://img.shields.io/coveralls/suiteplus/zipcode-br/master.svg

[david-url]: https://david-dm.org/suiteplus/zipcode-br
[david-image]: https://david-dm.org/suiteplus/zipcode-br.svg

[david-url-dev]: https://david-dm.org/suiteplus/zipcode-br#info=devDependencies
[david-image-dev]: https://david-dm.org/suiteplus/zipcode-br/dev-status.svg