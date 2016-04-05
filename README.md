# nsconfig [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url]

Configuration options for netsuite-related packages.

Set up authentication and custom parameters environment-wise or project-wise.

## Required

 * node.js 0.10+ or io.js 1+ or node.js 4+

## Install [![Dependency Status][david-image]][david-url] [![devDependency Status][david-image-dev]][david-url-dev]
```bash
    npm install nsconfig
```

## Usage

### nsconfig( overrideParams : any , projectParams? : ParamsDef[] , noThrow? : boolean )

Reads configuration parameters from the following sources (overriding each parameter on the same order):

  *  `overrideParams` argument;

  *  Searches up to 5 levels above cwd for a `nsconfig.json` file

  *  Searches for a `~/.ns/nsconfig.json` (on windows `~` is `X:/Users/<user>`)

  *  Environment variables found with the syntax `NSCONF_<UPPERCASE_PARAMETER_NAME>`. E.g. the `email` param can be forced to something else by exporting `NSCONF_EMAIL=email@example.com`.

The name `nsconfig.json` mentioned above can be overridden by setting the environment variable `NSCONF` with the config file you want to point to. E.g. `NSCONF='nsconfig-myproject.json'` looks for `nsconfig-myproject.json` instead of `nsconfig.json`, using the same methods as mentioned above. This can be useful when working with multiple NetSuite accounts. Please note that this overrides the file name and not the file path.

__projectParams__

Set additional parameters that your module may want to look up.

The default parameters are:

```javascript
[
    {name: 'email', required: true},
    {name: 'password', required: true},
    {name: 'account', required: true},
    {name: 'realm', def: 'system.netsuite.com'},
    {name: 'role'}
]
```
Currently accepted options for each custom parameter are:

```typescript
interface ParamsDef {
	name : string;
	required? : boolean; //throws an error if this parameter is not defined
	def? : boolean;      //defaults to this value if this parameter is not defined
}
```

### passwords and passwordHash

Instead of setting the `password` key, you may set `passwordHash` with a base64 encoded password.

Or you may use one the following options in order to avoid storing the password directly into the
project's `nsconfig.json`:

 - Set up the password as environment variable (`NSCONF_PASSWORD`)
 
 - Set the the password at `~/.ns/nsconfig.json`

### Example

Both configuration files below yield the same output:

  * _Raw password:_ [nsconfig.json](./example/nsconfig-simple.json)
  * _Hash password:_ [nsconfig.json](./example/nsconfig-hash.json)

	var params = nsconfig()

```json
{
	"email": "email@suiteplus.com",
	"password": "*****",
	"account": "DDAA12321",
	"realm": "system.netsuite.com",
	"role": 3
}
```

[travis-url]: https://travis-ci.org/suiteplus/nsconfig
[travis-image]: https://img.shields.io/travis/suiteplus/nsconfig.svg

[coveralls-url]: https://coveralls.io/r/suiteplus/nsconfig
[coveralls-image]: http://img.shields.io/coveralls/suiteplus/nsconfig/master.svg

[david-url]: https://david-dm.org/suiteplus/nsconfig
[david-image]: https://david-dm.org/suiteplus/nsconfig.svg

[david-url-dev]: https://david-dm.org/suiteplus/nsconfig#info=devDependencies
[david-image-dev]: https://david-dm.org/suiteplus/nsconfig/dev-status.svg

[npm-url]: https://npmjs.org/package/nsconfig
[npm-image]: http://img.shields.io/npm/v/nsconfig.svg