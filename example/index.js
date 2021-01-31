const Thanos = require('@thanos.js/core').default;
const Gauntlet = require('@thanos.js/gauntlet').default;
const RealityGem = require('@infinitygems/reality').default;

const thanos = new Thanos();
const gauntlet = new Gauntlet();

(async () => {
	await gauntlet.insertGem(new RealityGem());
	await gauntlet.insertGem(new RealityGem());

	thanos.snapFingers();
})();
