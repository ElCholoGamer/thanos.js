import { existsSync } from 'fs';
import { readFile, unlink } from 'fs/promises';
import ignore from 'ignore';
import parse from 'parse-gitignore';
import { readFullDir } from '../utils';
import Gauntlet from '@thanos.js/gauntlet';
import SnapOptions from './snap-options';
import OhShitTooMuchPowerError from './oh-shit-too-much-power-error';

class Thanos {
	public gauntlet: Gauntlet | null = null;

	public async snapFingers(options: SnapOptions = {}): Promise<string[]> {
		if (!this.gauntlet)
			throw new Error("Thanos doesn't have an Infinity Gauntlet");

		this.gauntlet.destroy();

		const {
			ignoreFile = '.thanosignore',
			deleteRatio = 0.5,
			ignoreNodeModules = true,
			ignoreGit = true,
		} = options;

		const files = await readFullDir('.');
		if (!files.length) return [];

		// Ignore files with .thanosignore
		if (existsSync(ignoreFile)) {
			const paths = parse(await readFile(ignoreFile));

			if (ignoreNodeModules) paths.push('node_modules');
			if (ignoreGit) paths.push('.git');

			const ig = ignore();
			ig.add([...paths, 'node_modules']);
			ig.filter(files);
		}

		let deleteCount = files.length * Math.max(0, Math.min(1, deleteRatio));

		if (!Number.isInteger(deleteCount)) {
			deleteCount = Math.floor(deleteCount) + Math.round(Math.random());
		}

		for (let i = 0; i < deleteCount; i++) {
			const index = Math.floor(Math.random() * files.length);
			files.splice(index, 1);
		}

		for (const file of files) await unlink(file);

		return files;
	}

	public equipGauntlet(gauntlet: Gauntlet) {
		if (gauntlet.gemCount > 0)
			throw new OhShitTooMuchPowerError(
				"Can't equip a gauntlet with gems on it"
			);

		this.gauntlet = gauntlet;
	}
}

export default Thanos;
