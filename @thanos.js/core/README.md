# @thanos.js/core

The core Thanos.js module. To be used with the [@thanos.js/gauntlet](https://npmjs.com/package/@thanos.js/gauntlet) package

## Installation

Using npm:

```bash
$ npm i @thanos.js/core
```

Using Yarn:

```bash
$ yarn add @thanos.js/core
```

## Example usage

```js
const Thanos = require('@thanos.js/core').default; // CommonJS
import Thanos from '@thanos.js/core'; // ES Module

const Gauntlet = require('@thanos.js/gauntlet').default;
const RealityGem = require('@infinitygems/reality').default;
const SoulGem = require('@infinitygems/soul').default;
const MindGem = require('@infinitygems/mind').default;
const TimeGem = require('@infinitygems/time').default;
const SpaceGem = require('@infinitygems/space').default;

const thanos = new Thanos();
const gauntlet = new Gauntlet();

thanos.equipGauntlet(gauntlet);

(async () => {
	console.log('Equiping reality gem...');
	await gauntlet.insertGem(new RealityGem());

	console.log('Equiping soul gem...');
	await gauntlet.insertGem(new SoulGem());

	console.log('Equiping mind gem...');
	await gauntlet.insertGem(new MindGem());

	console.log('Equiping time gem...');
	await gauntlet.insertGem(new TimeGem());

	console.log('Equiping space gem...');
	await gauntlet.insertGem(new SpaceGem());

	const deleted = await thanos.snapFingers();

	console.log(['Deleted files:', ...deleted].join('\n'));
})();
```
