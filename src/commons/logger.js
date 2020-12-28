import pino from 'pino';

export const getLogger = (source) => {
    const logger = pino({
        level: 'debug',
        prettyPrint: {
            colorize: true,
            // levelFirst: true,
            translateTime: 'SYS:HH:MM:ss dd-mm-yyyy',
            ignore: 'pid,hostname',
        },
    });
    return logger.child({ name: source })
};
