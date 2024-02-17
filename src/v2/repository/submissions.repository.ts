import { ID_FIELD, WriteConfirmation } from "firestorm-db";
import {
	SubmissionRepository,
	Submission,
	CreationSubmission,
	PackAll,
	PackID,
} from "~/v2/interfaces";
import { submissions } from "../firestorm/packs/submissions";
import { packs } from "../firestorm/packs";

export default class SubmissionFirestormRepository implements SubmissionRepository {
	getRaw(): Promise<Record<string, Submission>> {
		return submissions.readRaw();
	}

	getById(id: PackID): Promise<Submission> {
		return submissions.get(id);
	}

	async getEveryPack(): Promise<Record<PackID, PackAll>> {
		const submissionPacks = await submissions.readRaw();
		const fullPackPromises = Object.values(submissionPacks).map(async (p) => ({
			...(await packs.get(p.id)),
			submission: p,
		}));

		return Promise.all(fullPackPromises).then((p) =>
			// convert back to object from array
			p.reduce((acc, cur) => ({ ...acc, [cur.id]: cur }), {}),
		);
	}

	create(packId: string, packToCreate: CreationSubmission): Promise<Submission> {
		return submissions.set(packId, packToCreate).then(() => submissions.get(packId));
	}

	update(packId: PackID, newPack: Submission): Promise<Submission> {
		const packWithId = { ...newPack, [ID_FIELD]: packId };
		return submissions.set(packId, packWithId).then(() => submissions.get(packId));
	}

	delete(packId: PackID): Promise<WriteConfirmation> {
		return submissions.remove(packId);
	}
}