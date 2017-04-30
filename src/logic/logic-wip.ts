import * as fs from 'fs';
import * as path from 'path';

import { Logger } from "../../logger/generic-logger";

export class LogicWip {

    static async Go(rootFolder: string) {
        console.log('1');
        const promise = LogicWip.GetTopLevelFolders(rootFolder);

        let subFolders = await promise;
        console.log("2");
        console.log(Logger.stringify(subFolders));
        console.log("3");

        LogicWip.ProcessOneFolderOfPhotos(subFolders[0]);

        // for (let curFolder of subFolders) {
        //     LogicWip.ProcessOneFolderOfPhotos(curFolder);
        // }
    }

    static GetTopLevelFolders(folder: string): Promise<Array<string>> {
        const promise1: Promise<Array<string>> = new Promise((resolve, reject) => {
            fs.readdir(folder,
                (err, files) => {
                    // console.log('inside callback');
                    // console.log(Logger.stringify(files));

                    if (files) {

                        // Now filter down to only directories
                        let directories = new Array<string>();

                        files.map((x) => {
                            let potentialFolder = path.join(folder, x);
                            if (fs.statSync(potentialFolder).isDirectory()) {
                                directories.push(potentialFolder);
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

    static ProcessOneFolderOfPhotos(folder: string) {
        // Read date from the .json file
        let jsonFile = path.join(folder, 'metadata.json');

        let json = fs.readFileSync(jsonFile, "utf8");
        console.log(Logger.stringify(json));
        const jsonObj = JSON.parse(json);
        const dateString = (jsonObj as any).albumData.date;
        console.log(dateString);
        const jsDate: Date = new Date(Date.parse(dateString))
        console.log(jsDate.toLocaleString());
    }
}
