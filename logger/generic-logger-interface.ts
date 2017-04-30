export interface InterfaceLogger {
    debug(value: string): void;
    info(value: string): void;
    warn(value: string): void;
    error(value: string): void;
    fatal(value: string): void;
}
