import { readdir, stat } from 'fs/promises';
import { join } from 'path';

export async function readFullDir(dir: string): Promise<string[]> {
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

export function sleep(time: number) {
	return new Promise<number>(resolve => setTimeout(() => resolve(time), time));
}
