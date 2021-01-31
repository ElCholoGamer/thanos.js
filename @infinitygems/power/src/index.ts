import InfinityGem from '@infinitygems/core';

class PowerGem extends InfinityGem {
	public constructor() {
		super({
			name: 'Power Gem',
			color: '#56008f',
			chargeTime: 2000,
		});
	}
}

export default PowerGem;
