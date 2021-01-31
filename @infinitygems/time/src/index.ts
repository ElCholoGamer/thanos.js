import InfinityGem from '@infinitygems/core';

class TimeGem extends InfinityGem {
	public constructor() {
		super({
			name: 'Time Gem',
			color: '#069114',
			chargeTime: 3200,
		});
	}
}

export default TimeGem;
