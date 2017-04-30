import * as fs from 'fs';
import * as path from 'path';

import { Logger } from "./logger/generic-logger";
// ---- Main code. i.e. Entry pont for node.js -----

console.log('Google Photos Takeout Timestamp Tool: fix to match filenames');

console.log(process.env.HOME);

const rootFolder = process.env.HOME + '/GoogleTakoutFixup';

console.log(rootFolder);


//   export class dirent {
//        ino_t          d_ino;       /* Inode number */
//        off_t          d_off;       /* Not an offset; see below */
//        unsigned short d_reclen;    /* Length of this record */
//        unsigned char  d_type;      /* Type of file; not supported
//                                       by all filesystem types */
//        char           d_name[256]; /* Null-terminated filename */
//    };

console.log('1');


fs.readdir(rootFolder,
    (err, directoryContents: Array<any>) => {
        console.log('3');

        console.log(Logger.stringify(directoryContents));

        let directories = new Array<string>();

        directoryContents.map((x) => {
            if (fs.statSync(path.join(rootFolder, x)).isDirectory()) {
                directories.push(x);
            }
        });

        console.log('4');

        console.log(Logger.stringify(directories));
    });

console.log('5');
