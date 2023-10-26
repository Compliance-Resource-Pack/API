import { Textures, Texture, TextureCreationParam, Use, Uses, Path, Paths, InputPath } from "~/v2/interfaces";

export interface OldCreationUse {
	textureID: number;
	textureUseName: string;
	editions: Array<string>;
}

export interface OldUse extends OldCreationUse {
	id: string;
}

interface OldUses extends Array<OldUse> {}

export function mapUse(old: OldUse): Use {
	return {
		id: old.id,
		name: old.textureUseName,
		texture: Number.parseInt(old.id, 10),
		edition: old.editions[0],
	};
}

export function unmapUse(use: Use): OldUse {
	return {
		textureUseName: use.name,
		editions: [use.edition],
		textureID: use.texture,
		id: use.id,
	};
}

export function mapUses(data: OldUses): Uses {
	return data.map(mapUse);
}

interface OldCreationTexture {
	name: string;
	type: Array<string>;
}

interface OldTexture extends OldCreationTexture {
	id: string;
}
interface OldTextures extends Array<OldTexture> {}

export function mapTexture(old: OldTexture): Texture {
	if (old.type === undefined) return old as any; // already converted texture

	return {
		id: old.id,
		name: old.name,
		tags: old.type,
	} as Texture;
}
export function mapTextures(data: OldTextures): Textures {
	return data.map(mapTexture);
}

export function unmapTextureCreation(data: TextureCreationParam): OldCreationTexture {
	return {
		name: String(data.name),
		type: data.tags
	}
}

export function unmapTexture(data: Texture): OldTexture {
	return {
		id: data.id,
		name: String(data.name),
		type: data.tags,
	};
}

interface OldCreationPath {
	useID: string;
	path: string;
	versions: Array<string>;
	mcmeta: boolean;
}

interface OldPath extends OldCreationPath {
	id: string;
}
interface OldPaths extends Array<OldPath> {}

export function mapPath(old: OldPath): Path {
	return {
		id: old.id,
		use: old.useID,
		name: old.path,
		mcmeta: old.mcmeta,
		versions: old.versions,
	};
}

export function unmapPath(path: InputPath): OldCreationPath {
	return {
		useID: path.use,
		path: path.name,
		versions: path.versions,
		mcmeta: path.mcmeta,
	};
}

export function mapPaths(data: OldPaths): Paths {
	return data.map(mapPath);
}

export interface OldContribution {
	date: number;
	res: "c32" | "c64";
	textureID: number;
	contributors: Array<string>;
	id: string;
}
export interface OldContributions extends Array<OldContribution> {}
