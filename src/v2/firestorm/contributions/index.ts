import firestorm from 'firestorm-db';
import { Texture, User } from '~/v2/tools/interfaces';
import { users } from '..';
import config from '../config';
import textures from '../textures';
config();

export default firestorm.collection('contributions', (el) => {
	el.getContributors = (): Promise<User> => {
		return users.searchKeys(el.contributors || []);
	};

	el.texture = (): Promise<Texture> => {
		return textures.get(el.textureID);
	};

	return el;
});
