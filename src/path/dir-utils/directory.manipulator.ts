import { Path } from "../path";
import fs from "fs"

export class DirectoryManipulator extends Path {
    constructor(path: string) {
        super(path);
    }

    public getPath(): string {
        return this.fullPath
    }
}

const dir: DirectoryManipulator = new DirectoryManipulator("../")
console.log(dir.getPath())