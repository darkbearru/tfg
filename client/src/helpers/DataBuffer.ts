import type { LoaderType } from '@/types/loader.types.ts';

export class DataBuffer<T> {
	private buffer: T[][];
	private currentPage: number;

	constructor(
		private readonly  bufferSize: number,
		private readonly totalDataCount: number,
		private readonly loader: LoaderType<T>
	) {
		this.buffer = [];
		this.currentPage = 0;
	}

	private async loadPage(page: number): Promise<T[]> {
		return this.loader(page);
	}

	private async updateBuffer(currentRow: number): Promise<void> {
		const newPage = Math.floor(currentRow / this.bufferSize);
		if (newPage !== this.currentPage) {
			this.currentPage = newPage;

			const pages = [
				newPage > 0 ? newPage - 1 : null,
				newPage,
				newPage < Math.ceil(this.totalDataCount / this.bufferSize) - 1 ? newPage + 1 : null
			];

			this.buffer = [];
			for (const page of pages) {
				if (page === null) {
					this.buffer.push([]);
					continue;
				}
				this.buffer.push(await this.loadPage(page));
			}
		}
	}

	public getData(currentRow: number): T[] {
		this.updateBuffer(currentRow).then();

		const pageOffset = currentRow % this.bufferSize;
		const currentPageData = this.buffer.find(page => page.length > 0);

		return currentPageData ? currentPageData.slice(pageOffset, pageOffset + this.bufferSize) : [];
	}
}