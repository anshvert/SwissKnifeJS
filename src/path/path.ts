/**
 * Base Class for Path Manipulation
 */
export abstract class Path {
    readonly #path: string

    protected constructor(path: string) {
        this.#path = path
    }

    protected get fullPath(): string {
        return this.#path;
    }
}