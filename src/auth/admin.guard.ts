import { Injectable, CanActivate, ExecutionContext, UnauthorizedException  } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user; // Asumiendo que obtienes el usuario del token

        if (user.role !== 'admin') {
            throw new UnauthorizedException('You do not have administrator privileges');
        }

        return true;
    }
}
