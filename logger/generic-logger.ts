import * as stringifyObject from 'stringify-object';

import { InterfaceLogger } from './generic-logger-interface';
import { GenericLoggerLevelsEnum } from './generic-logger-levels-enum';

export class Logger implements InterfaceLogger {
    private static _instance: Logger | null = null;
    private _loggingLevel: GenericLoggerLevelsEnum = GenericLoggerLevelsEnum.info;

    public static instanceOf(): Logger {
        if (Logger._instance === null) {
            Logger._instance = new Logger();

            Logger._instance.info('Logging Initialized at log level: ' + GenericLoggerLevelsEnum[Logger._instance._loggingLevel]);
            // console.log('Logging Initialized at log level: ' + GenericLoggerLevelsEnum[Logger._instance._loggingLevel]);
        }

        return Logger._instance;
    }

    public static stringify(obj: any): string {
        // Use the stringfy library de-jour :)
        const result = stringifyObject(obj);

        return result;
    }

    // Make constructor private (this is a Singleton)
    private Logger() {
    }

    public debug(value: string) {
        if (this._loggingLevel <= GenericLoggerLevelsEnum.debug) {
            // tslint:disable-next-line:no-console
            console.debug(value);
        }
    }

    public info(value: string) {
        if (this._loggingLevel <= GenericLoggerLevelsEnum.info) {
            // tslint:disable-next-line:no-console
            console.info(value);
        }
    }

    public warn(value: string) {
        if (this._loggingLevel <= GenericLoggerLevelsEnum.warn) {
            // tslint:disable-next-line:no-console
            console.warn(value);
       }
    }

    public error(value: string) {
        if (this._loggingLevel <= GenericLoggerLevelsEnum.error) {
            // tslint:disable-next-line:no-console
            console.error(value);
        }
    }

    public fatal(value: string) {
        if (this._loggingLevel >= GenericLoggerLevelsEnum.fatal) {
            // tslint:disable-next-line:no-console
            console.error(value);
        }
    }

}
