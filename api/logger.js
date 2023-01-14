const  { createLogger, format, transports } = require ('winston') 

const logger = createLogger({
    level: 'info',
    exitOnError: false,
    format: format.combine(
        format.timestamp(),
        format.json(),
    ),
    transports: [
      new transports.File({ filename: './logs/cards.log' }),
      new transports.Console(),
    ],
});

const statusLogger = createLogger({
    level: 'info',
    exitOnError: false,
    format: format.combine(
        format.timestamp(),
        format.json(),
    ),
    transports: [
      new transports.File({ filename: './logs/columns.log' }),
      new transports.Console(),
    ],
});

module.exports = {logger, statusLogger}