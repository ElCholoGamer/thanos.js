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

export async function isInstalled(pkg: string): Promise<boolean> {
	try {
		await import(pkg);
		return true;
	} catch {
		return false;
	}
}
