import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'https://m.media-amazon.com/images/I/41fveBeDWmL._SY346_.jpg',
  })
  readonly image_url: string;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
