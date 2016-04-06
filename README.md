#
zipcode - br[![Build Status][travis - image]][travis - url][![Coveralls Status][coveralls - image]][coveralls - url]


## Required
    * node.js 4 +

    ##Install[![Dependency Status][david - image]][david - url][![devDependency Status][david - image - dev]][david - url - dev]
``
`bash
    npm install suiteplus/zipcode-br --save
`
``


Create a json array of zipcodes from brazil using DNE files,
for that you need the files DELTA_LOG_FAIXA_LOC.txt and DELTA_LOG_LOCALIDADE.txt from DNE.

how to use:

    Create a json object with zipBand, location and config.

zipBand: It 's the path to the file DELTA_LOG_FAIXA_LOC.txt it can be a array of paths or only a string to the path.
location: The same as zipBand but
for the file DELTA_LOG_LOCALIDADE.txt
config: set it to 0
if you want search files with separators or 1
if you want without it.

Example:

    var opts = {
        zipBand: './files/DELTA_LOG_FAIXA_LOC.txt',
        location: './files/DELTA_LOG_LOCALIDADE.txt',
        config: 0
    }

Call the
function.parse() passing the json to parse the files.
example:

    zipcode.parse(opts);







[travis - url]: https: //travis-ci.org/suiteplus/zipcode-br
    [travis - image]: https: //img.shields.io/travis/suiteplus/zipcode-br.svg

    [coveralls - url]: https: //coveralls.io/r/suiteplus/zipcode-br
    [coveralls - image]: http: //img.shields.io/coveralls/suiteplus/zipcode-br/master.svg

    [david - url]: https: //david-dm.org/suiteplus/zipcode-br
    [david - image]: https: //david-dm.org/suiteplus/zipcode-br.svg

    [david - url - dev]: https: //david-dm.org/suiteplus/zipcode-br#info=devDependencies
    [david - image - dev]: https: //david-dm.org/suiteplus/zipcode-br/dev-status.svg
