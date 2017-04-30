"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringifyObject = require("stringify-object");
const generic_logger_levels_enum_1 = require("./generic-logger-levels-enum");
class Logger {
    constructor() {
        this._loggingLevel = generic_logger_levels_enum_1.GenericLoggerLevelsEnum.info;
    }
    static instanceOf() {
        if (Logger._instance === null) {
            Logger._instance = new Logger();
            Logger._instance.info('Logging Initialized at log level: ' + generic_logger_levels_enum_1.GenericLoggerLevelsEnum[Logger._instance._loggingLevel]);
            // console.log('Logging Initialized at log level: ' + GenericLoggerLevelsEnum[Logger._instance._loggingLevel]);
        }
        return Logger._instance;
    }
    static stringify(obj) {
        // Use the stringfy library de-jour :)
        const result = stringifyObject(obj);
        return result;
    }
    // Make constructor private (this is a Singleton)
    Logger() {
    }
    debug(value) {
        if (this._loggingLevel <= generic_logger_levels_enum_1.GenericLoggerLevelsEnum.debug) {
            // tslint:disable-next-line:no-console
            console.debug(value);
        }
    }
    info(value) {
        if (this._loggingLevel <= generic_logger_levels_enum_1.GenericLoggerLevelsEnum.info) {
            // tslint:disable-next-line:no-console
            console.info(value);
        }
    }
    warn(value) {
        if (this._loggingLevel <= generic_logger_levels_enum_1.GenericLoggerLevelsEnum.warn) {
            // tslint:disable-next-line:no-console
            console.warn(value);
        }
    }
    error(value) {
        if (this._loggingLevel <= generic_logger_levels_enum_1.GenericLoggerLevelsEnum.error) {
            // tslint:disable-next-line:no-console
            console.error(value);
        }
    }
    fatal(value) {
        if (this._loggingLevel >= generic_logger_levels_enum_1.GenericLoggerLevelsEnum.fatal) {
            // tslint:disable-next-line:no-console
            console.error(value);
        }
    }
}
Logger._instance = null;
exports.Logger = Logger;
//# sourceMappingURL=generic-logger.js.map