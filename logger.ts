import chalk from "chalk";

export enum LogLevel {
    FATAL,
    ERROR,
    DATABASE,
    WARN,
    INFO,
    DEBUG
}

const LogStyle = [
    chalk.magenta.bold,
    chalk.red.bold,
    chalk.green.bold,
    chalk.yellow.bold,
    chalk.cyan.bold,
    chalk.white.bold
];

const logMode = LogLevel.DEBUG;

export function log(msg: unknown, level: LogLevel) {
    if (logMode < level) return;

    const timestamp = (new Date()).toISOString();

    const logLevel: string = LogStyle[level](LogLevel[level]);

    console.log(`${timestamp} - [${logLevel}]: ${msg}`);
}
