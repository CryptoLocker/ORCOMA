import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common"

export const RawHeaders = createParamDecorator(
    (data: string, context: ExecutionContext) => {

        const req = context.switchToHttp().getRequest()

        return ( !data ) ? req.rawHeaders : req.rawHeaders[data]
    }
)