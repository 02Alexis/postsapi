import { IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { User } from "../../auth/schemas/user.schema";

export class CreatePostDto {

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly author: string;

    @IsEmpty({ message: "You cannot pass user id" })
    readonly user: User
}