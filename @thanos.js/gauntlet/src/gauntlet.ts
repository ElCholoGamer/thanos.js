import InfinityGem from '@infinitygems/core';
import DuplicateGemError from './errors/duplicate-gem-error';
import GemOverloadError from './errors/gem-overload-error';
import GemsMissingError from './errors/gems-missing-error';

function sleep(time: number) {
	return new Promise<number>(resolve => setTimeout(() => resolve(time), time));
}

class Gauntlet {
	private used = false;
	private equiping = false;

	protected readonly gems: InfinityGem[] = [];

	public async insertGem(gem: InfinityGem) {
		if (this.used) throw new Error('Gauntlet has already been used');

		if (!(gem instanceof InfinityGem))
			throw new TypeError('"gem" must be instance of InfinityGem');

		if (this.gems.find(g => g.constructor === gem.constructor))
			throw new DuplicateGemError();

		if (this.equiping) throw new Error('Gauntlet is already equiping a gem');

		// Charge gem
		this.equiping = true;
		await sleep(gem.chargeTime);
		this.equiping = false;

		if (this.gems.length >= 6)
			throw new GemOverloadError('Gauntlet is already full');

		this.gems.push(gem);
	}

	public get gemCount() {
		return this.gems.length;
	}

	public destroy() {
		if (this.gems.length < 6) throw new GemsMissingError();

		this.used = true;
	}
}

export default Gauntlet;
