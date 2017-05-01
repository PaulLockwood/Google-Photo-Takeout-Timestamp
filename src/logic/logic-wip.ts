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

        for (const curFolder of subFolders) {
            const defaultDate = LogicWip.GetDefaultDateForFolder(curFolder);
            const filesToProcess = LogicWip.FindFilesWithoutImplicitTimeStamp(curFolder);
            LogicWip.SetTimestampOnFiles(defaultDate, filesToProcess);
        }

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

    static GetDefaultDateForFolder(folder: string): Date {
        // Read date from the .json file
        let jsonFile = path.join(folder, 'metadata.json');

        let json = fs.readFileSync(jsonFile, "utf8");
        // console.log(Logger.stringify(json));
        const jsonObj = JSON.parse(json);
        const dateString = (jsonObj as any).albumData.date;
        // console.log(dateString);
        const jsDate: Date = new Date(Date.parse(dateString))
        console.log('Default date for folder: ' + jsDate.toLocaleString());

        return jsDate;
    }

    static FindFilesWithoutImplicitTimeStamp(folder: string): Array<string> {

        let jpgFiles;
        {
            // Find .jpg files in the folder
            let files = fs.readdirSync(folder);
            // Filter to just *.jpg
            jpgFiles = files.filter((x: string) => x.toLowerCase().endsWith(".jpg"));
        }

        // Find files who's name don't include the implicit timestamp
        let folderName = folder.substring(folder.lastIndexOf('/') + 1);
        let usualStartOfFileName = 'IMG_' + folderName.replace('-', '').replace('-', '') + '_';

        console.log('usualStartOfFileName is ' + usualStartOfFileName);

        let result: Array<string> = new Array<string>();
        for (const curFile of jpgFiles) {
            if (!curFile.startsWith(usualStartOfFileName)) {
                let fullfileName = path.join(folder, curFile);
                result.push(fullfileName);
            } else {
                // console.log('OK: ' + curFile);
            }

        }

        // console.log(Logger.stringify(result));

        return result;
    }

    private static SetTimestampOnFiles(defaultDate: Date, files: Array<string>) {

        console.log(defaultDate.toLocaleDateString());
        let mTime = defaultDate.valueOf() / 1000;
        // let mTime = new Date(defaultDate).getUTCMilliseconds();
        // let mTime = defaultDate.getUTCMilliseconds()

        for (const curFile of files) {
            console.log(curFile);
            fs.utimesSync(curFile, mTime, mTime);
        }

    }

}
