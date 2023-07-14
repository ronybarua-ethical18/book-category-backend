// import path from 'path'
// import { createLogger, format, transports } from 'winston'
// import DailyRotateFile from 'winston-daily-rotate-file'
// const { combine, timestamp, label, printf, prettyPrint } = format

// const myFormat = printf(({ level, message, label, timestamp }) => {
//   return `${timestamp} [${label}] ${level}: ${message}`
// })

// const successLogger = createLogger({
//   level: 'info',
//   format: combine(
//     label({ label: 'right meow!' }),
//     timestamp(),
//     prettyPrint(),
//     myFormat
//   ),
//   // defaultMeta: { service: 'user-service' },
//   transports: [
//     new transports.Console(),
//     new DailyRotateFile({
//       filename: path.join(
//         process.cwd(),
//         'logs',
//         'successes',
//         'phu-%DATE%.success.log'
//       ),
//       datePattern: 'YYYY-MM-DD-HH',
//       zippedArchive: true,
//       maxSize: '20m',
//       maxFiles: '14d',
//     }),
//   ],
// })

// const errorLogger = createLogger({
//   level: 'error',
//   format: combine(
//     label({ label: 'right meow!' }),
//     timestamp(),
//     myFormat,
//     prettyPrint()
//   ),
//   // defaultMeta: { service: 'user-service' },
//   transports: [
//     new transports.Console(),
//     new DailyRotateFile({
//       filename: path.join(
//         process.cwd(),
//         'logs',
//         'errors',
//         'phu-%DATE%.error.log'
//       ),
//       datePattern: 'YYYY-MM-DD-HH',
//       zippedArchive: true,
//       maxSize: '20m',
//       maxFiles: '14d',
//     }),
//   ],
// })

// // export { successLogger, errorLogger }
