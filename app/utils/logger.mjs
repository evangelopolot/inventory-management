import { format, createLogger, transports, addColors } from "winston";
const { combine, timestamp, label, printf, prettyPrint, colorize } = format;

const CATEGORY = "Auth Service";

const devFormat = combine(
  label({ label: CATEGORY }),
  timestamp({
    format: "MMM-DD-YYYY HH:mm:ss",
  }),
  colorize({ all: true }),
  printf(
    (info) =>
      `${info.timestamp} - [${info.level}] ${info.label} : ${info.message} ${
        info.username ? " - " + info.username : ""
      }`
  )
);

const simpleFormat = format.combine(
  format.timestamp(),
  format.printf(
    (info) =>
      `${info.timestamp} ${info.level}: ${info.message} ${
        info.username ? info.username + " - " : ""
      }`
  )
);

const logger = createLogger({
  level: "debug",
});

addColors({
  error: "bold red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  verbose: "cyan",
  debug: "blue",
});

if (process.env.DEBUG === "true") {
  logger.add(
    new transports.Console({
      format: devFormat,
    })
  );
} else if (process.env.NODE_ENV === "production") {
  logger.add(
    new transports.Console({
      format: simpleFormat,
    })
  );
} else {
  logger.add(
    new transports.Console({
      format: devFormat,
    })
  );
}

export default logger;
