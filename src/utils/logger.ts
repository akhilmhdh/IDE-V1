import pino, { LoggerOptions } from 'pino';
// import path from 'path'
const logLevels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace'];

const getLogLevel = () => {
    const givenLevel = logLevels.indexOf(process.env.LOG_LEVEL || 'debug');
    return logLevels[givenLevel];
};

const getBool = (env: undefined | string) => {
    if (!env) return true;
    return env.toLowerCase() === 'true' ? true : false;
};

const loggerConfig: LoggerOptions = {
    level: getLogLevel(),
    timestamp: getBool(process.env.LOG_TIME_STAMP),
    prettyPrint: {},
    prettifier: require('pino-colada'),
    enabled: getBool(process.env.NOLOG)
};
//  path.resolve(__dirname) + "/../logs/info.log")
export default pino(loggerConfig);
