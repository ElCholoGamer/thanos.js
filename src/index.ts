import { readdir, readFile, stat, unlink } from 'fs/promises';
import parse from 'parse-gitignore';
import ignore from 'ignore';
import { join } from 'path';
import { existsSync } from 'fs';

export interface SnapOptions {
	ignoreFile?: string;
}

async function readFullDir(dir: string): Promise<string[]> {
	const total: string[] = [];
	const files = await readdir(dir);

	for (const file of files) {
		const path = join(dir, file);
		const fileStat = await stat(path);

		if (fileStat.isDirectory()) {
			const subFiles = await readFullDir(path);
			total.push(...subFiles);
		} else {
			total.push(path);
		}
	}

	return total;
}

class Thanos {
	public async snapFingers(options: SnapOptions = {}): Promise<string[]> {
		const { ignoreFile = '.thanosignore' } = options;

		const files = await readFullDir('.');
		if (!files.length) return [];

		if (existsSync(ignoreFile)) {
			const paths = parse(await readFile(ignoreFile));
			const ig = ignore();

			ig.add([...paths, 'node_modules']);
			ig.filter(files);
		}

		let deleteCount = Math.floor(files.length / 2);
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
