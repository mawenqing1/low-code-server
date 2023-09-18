import { Logger, createLogger, format, transports } from "winston";

export class AppLogger {
    private context?: string;
    private logger: Logger;

    public setContext(context: string): void {
        this.context = context;
    }

    constructor() {
        this.logger = createLogger({
            level: process.env.LOGGER_LEVEL, //日志分级
            format: format.combine( //日志格式
                format.timestamp(),
                format.prettyPrint()
            ),
            transports: [
                new transports.File({
                    filename: "logs/error.log",
                    level: "error"
                }),
                new transports.File({
                    filename: "logs/combine.log",
                    level: "combined.log"
                }),
                new transports.Console()
            ]
        })
    }

    error(ctx: any, message: string, meta?: Record<string, any>): Logger {
        return this.logger.error({
            message,
            ctx,
            contextName: this.context,
            ...meta
        })
    }

    warn(ctx: any, message: string, meta?: Record<string, any>): Logger {
        return this.logger.warn({
            message,
            ctx,
            contextName: this.context,
            ...meta
        })
    }
    
    debug(ctx: any, message: string, meta?: Record<string, any>): Logger {
        return this.logger.debug({
            message,
            ctx,
            contextName: this.context,
            ...meta
        })
    }

    info(ctx: any, message: string, meta?: Record<string, any>): Logger {
        return this.logger.info({
            message,
            ctx,
            contextName: this.context,
            ...meta
        })
    }
}