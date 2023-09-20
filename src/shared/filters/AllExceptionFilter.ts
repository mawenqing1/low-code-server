import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const code = exception.getStatus ? exception.getStatus() : 500;
        const message = exception.message ? exception.message : "Internal Server Error";

        response.status(200).json({
            code,
            message
        })
    }
}