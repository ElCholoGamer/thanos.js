import { existsSync } from 'fs';
import { readFile, unlink } from 'fs/promises';
import ignore from 'ignore';
import parse from 'parse-gitignore';
import { readFullDir } from '../utils';
import SnapOptions from './snap-options';

class Thanos {
	public async snapFingers(options: SnapOptions = {}): Promise<string[]> {
		const { ignoreFile = '.thanosignore', deleteRatio = 0.5 } = options;

		const files = await readFullDir('.');
		if (!files.length) return [];

		if (existsSync(ignoreFile)) {
			const paths = parse(await readFile(ignoreFile));
			const ig = ignore();

			ig.add([...paths, 'node_modules']);
			ig.filter(files);
		}

		let deleteCount = Math.floor(
			files.length * Math.max(0, Math.min(1, deleteRatio))
		);

		if (files.length % 2 !== 0) {
			deleteCount += Math.round(Math.random());
		}

		for (let i = 0; i < deleteCount; i++) {
			const index = Math.floor(Math.random() * files.length);
			files.splice(index, 1);
		}

		for (const file of files) await unlink(file);

		return files;
	}
}

export default Thanos;
