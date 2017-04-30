
import { Logger } from "./logger/generic-logger";
import { LogicWip } from "./src/logic/logic-wip";
// ---- Main code. i.e. Entry pont for node.js -----

console.log('Google Photos Takeout Timestamp Tool: fix to match filenames');

// console.log(process.env.HOME);

const rootFolder = process.env.HOME + '/GoogleTakoutFixup';

LogicWip.Go(rootFolder);
