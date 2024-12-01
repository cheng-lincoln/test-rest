import winston from "winston";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
    const env = process.env.NODE_ENV || "development";
    const isDevelopment = env === "development";
    return isDevelopment ? "debug" : "warn";
  };

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
  };
  
winston.addColors(colors);

const consoleTransportOptions: winston.transports.ConsoleTransportOptions = {
    handleExceptions: true,
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
        winston.format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),    
    )
};

const errorLogsFileTransportOptions: winston.transports.FileTransportOptions = {
    filename: process.env.ERROR_LOGS_DIR,
    level: "error",
    format: winston.format.combine(
          winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
          winston.format.printf(
              (info) => `${info.timestamp} ${info.level}: ${info.message}`,
          ),    
      )
};

const allLogsFileTransportOptions: winston.transports.FileTransportOptions = {
    filename: process.env.LOGS_DIR,
    format: winston.format.combine(
          winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
          winston.format.printf(
              (info) => `${info.timestamp} ${info.level}: ${info.message}`,
          ),    
      )
};

const transports = [
    new winston.transports.Console(consoleTransportOptions),
    new winston.transports.File(errorLogsFileTransportOptions),
    new winston.transports.File(allLogsFileTransportOptions),
  ];

const Logger = winston.createLogger(
  {
    level: level(),
    levels,
    transports,
  }
);
  
export default Logger;