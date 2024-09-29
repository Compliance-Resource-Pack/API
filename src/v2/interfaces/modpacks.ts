import { Mods } from "./mods";

export interface Modpack {
	id: string; // modpack id (curseforge project id)
	name: string; // modpack name
	authors: Array<string>; // modpacks authors
	versions: Array<{
		id: string; // modpack version
		minecraft: string; // minecraft version (ex: "1.18")
		mods: Mods;
	}>;
}

export type Modpacks = Modpack[];

export interface FirestormModpack extends Modpack {}

export interface ModpacksRepository {
	getRaw(): Promise<Record<string, Modpack>>;
	getThumbnail(id: number): Promise<string>;
}
