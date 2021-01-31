import InfinityGem from '@infinitygems/core';

class SpaceGem extends InfinityGem {
	public constructor() {
		super({
			name: 'Space Gem',
			color: '#0898bd',
			chargeTime: 3500,
		});
	}
}

export default SpaceGem;
