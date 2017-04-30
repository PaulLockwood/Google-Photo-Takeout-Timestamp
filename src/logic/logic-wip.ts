import * as fs from 'fs';
import * as path from 'path';

import { Logger } from "../../logger/generic-logger";

export class LogicWip {

    static async Go(rootFolder: string) {
        console.log('1');
        const promise = LogicWip.GetDirectoryContents(rootFolder);

        let directoryContents = await promise;
        console.log("2");
        console.log(Logger.stringify(directoryContents));
        console.log("3");
    }

    static GetDirectoryContents(folder: string): Promise<Array<string>> {
        const promise1: Promise<Array<string>> = new Promise((resolve, reject) => {
            fs.readdir(folder,
                (err, files) => {
                    // console.log('inside callback');
                    // console.log(Logger.stringify(files));

                    if (files) {

                        // Now filter down to only directories
                        let directories = new Array<string>();

                        files.map((x) => {
                            if (fs.statSync(path.join(folder, x)).isDirectory()) {
                                directories.push(x);
                            }
                        });

                        resolve(directories);
                    };
                    if (err) {
                        reject(err);
                    }
                });
        });

        return promise1;
    }
}
