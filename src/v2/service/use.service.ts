import { UseRepository, Use, Uses, Paths, CreationUse } from "../interfaces";
import UseFirestormRepository from "../repository/firestorm/use.repository";
import { BadRequestError, NotFoundError } from "../tools/ApiError";
import PathService from "./path.service";

export default class UseService {
	constructor();

	constructor(pathService: PathService);

	constructor(...args: any[]) {
		// eslint-disable-next-line prefer-destructuring
		if (args.length) this.pathService = args[0];
		else this.pathService = new PathService(this);
	}

	private readonly useRepo: UseRepository = new UseFirestormRepository();

	private readonly pathService: PathService;

	getPathUseByIdOrName(id_or_name: string): Promise<Paths> {
		return this.getUseByIdOrName(id_or_name).then((use: Use) =>
			this.pathService.getPathByUseId(use.id)
		);
	}

	getRaw(): Promise<Uses> {
		return this.useRepo.getRaw();
	}

	getUseByIdOrName(id_or_name: string): Promise<Uses | Use> {
		return this.useRepo.getUseByIdOrName(id_or_name);
	}

	getUseByIdOrNameAndCatch(id_or_name: string): Promise<Uses | Use> {
		return this.getUseByIdOrName(id_or_name)
			.then((res) => {
				let found = false;
				if(Array.isArray(res)) {
					found = res.length > 0;
				} else {
					found = res !== undefined;
				}

				return found ?
					Promise.resolve(res) :
					Promise.reject(new NotFoundError(`Use ID not found`));
			});
	}

	updateUse(id: string, modifiedUse: CreationUse): Use | PromiseLike<Use> {
		return this.getUseByIdOrNameAndCatch(id).then(() => this.useRepo.set({
			id,
			...modifiedUse,
		}));
	}

	deleteUse(id: string): Promise<void> {
		return this.useRepo.deleteUse(id);
	}

	getUsesByIdsAndEdition(id_arr: number[], edition: string): Promise<Uses> {
		return this.useRepo.getUsesByIdAndEdition(id_arr, edition);
	}

	createUse(use: Use): Promise<Use> {
		return new Promise((resolve, reject) => {
			this.getUseByIdOrNameAndCatch(use.id)
				.then(() => {
					reject(new BadRequestError("Texture use ID already exists"))
				})
				.catch(() => {
					this.useRepo.set(use)
						.then((resultUse) => {
							resolve(resultUse)
						})
						.catch((...args) => reject(args))
				})
		})
	}
}