import { IsEmpty, IsOptional, IsString } from "class-validator";
import { User } from "../../auth/schemas/user.schema";

export class UpdatePostDto {

    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly description: string;
    
    @IsOptional()
    @IsString()
    readonly author: string;

    @IsEmpty({ message: "You cannot pass user id" })
    readonly user: User
}