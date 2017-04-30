"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const generic_logger_1 = require("../logger/generic-logger");
class LogicWip {
    static Go(rootFolder) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('1');
            const promise = LogicWip.GetDirectoryContents(rootFolder);
            let directoryContents = yield promise;
            console.log("2");
            console.log(generic_logger_1.Logger.stringify(directoryContents));
            console.log("3");
        });
    }
    static GetDirectoryContents(folder) {
        const promise1 = new Promise((resolve, reject) => {
            fs.readdir(folder, (err, files) => {
                // console.log('inside callback');
                // console.log(Logger.stringify(files));
                if (files) {
                    // Now filter down to only directories
                    let directories = new Array();
                    files.map((x) => {
                        if (fs.statSync(path.join(folder, x)).isDirectory()) {
                            directories.push(x);
                        }
                    });
                    resolve(directories);
                }
                ;
                if (err) {
                    reject(err);
                }
            });
        });
        return promise1;
    }
}
exports.LogicWip = LogicWip;
//# sourceMappingURL=logic-wip.js.map