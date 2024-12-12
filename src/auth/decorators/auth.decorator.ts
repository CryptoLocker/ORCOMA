import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ValidRoles } from "../interfaces";
import { RoleProtected } from "./role-protected.decorator";
import { UserRoleGuard } from "../guards/user-role.guard";
import { ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse } from "@nestjs/swagger";

export function Auth(...roles: ValidRoles[]) {
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard),
        // Swagger documentation
        ApiBearerAuth(),
        ApiUnauthorizedResponse({ 
            description: 'User not authenticated' 
        }),
        ApiForbiddenResponse({ 
            description: roles.length 
                ? `User needs one of these roles: ${roles}` 
                : 'User does not have sufficient privileges' 
        }),
    )
}