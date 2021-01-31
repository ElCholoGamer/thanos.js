const Thanos = require('@thanos.js/core').default;
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

	console.log(['Deleted fles:', ...deleted].join('\n'));
})();
