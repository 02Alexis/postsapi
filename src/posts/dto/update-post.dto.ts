import { IsEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'https://m.media-amazon.com/images/I/41fveBeDWmL._SY346_.jpg',
  })
  readonly image_url: string;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
