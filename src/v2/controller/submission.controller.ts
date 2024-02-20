import { Body, Controller, Delete, Get, Path, Post, Put, Route, Security, Tags } from "tsoa";
import { WriteConfirmation } from "firestorm-db";
import { SubmissionService } from "../service/submission.service";
import { PackID, CreationSubmission, PackAll, Submission } from "../interfaces";

@Route("submissions")
@Tags("Submissions")
export class SubmissionController extends Controller {
	private readonly service = new SubmissionService();

	/**
	 * Get the raw collection of submittable packs
	 */
	@Get("raw")
	public async getRaw(): Promise<Record<string, Submission>> {
		return this.service.getRaw();
	}

	/**
	 * Get all submittable packs with their main pack information
	 */
	@Get("all")
	public async getEveryPack(): Promise<Record<PackID, PackAll>> {
		return this.service.getEveryPack();
	}

	/**
	 * Get a submission pack by ID
	 */
	@Get("{pack_id}")
	public async getPack(@Path() pack_id: PackID): Promise<Submission> {
		return this.service.getById(pack_id);
	}

	/**
	 * Add submission support to an existing pack
	 * @param body Pack information
	 */
	@Post("")
	@Security("bot")
	@Security("discord", ["administrator"])
	public async createPack(@Body() body: CreationSubmission): Promise<Submission> {
		return this.service.create(body.id, body);
	}

	/**
	 * Edit an existing submission pack
	 * @param id Pack ID to edit
	 * @param body Pack information
	 */
	@Put("{id}")
	@Security("bot")
	@Security("discord", ["administrator"])
	public async update(@Path() id: PackID, @Body() body: Submission): Promise<Submission> {
		return this.service.update(id, body);
	}

	/**
	 * Deletes the submission pack entry (effectively converts a submission pack to a regular pack)
	 * @param id Pack ID
	 */
	@Delete("{id}")
	@Security("bot")
	@Security("discord", ["administrator"])
	public async delete(id: PackID): Promise<WriteConfirmation> {
		return this.service.delete(id);
	}
}
