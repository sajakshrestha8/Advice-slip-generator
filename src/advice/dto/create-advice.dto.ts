import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AdviceCategory, AdviceFeeling } from '../../../schemas/advice.schema';

export class CreateAdviceDto {
  @IsString()
  @IsNotEmpty()
  advice: string;

  @IsEnum(AdviceCategory)
  @IsNotEmpty()
  category: AdviceCategory;

  @IsEnum(AdviceFeeling)
  @IsNotEmpty()
  feeling: AdviceFeeling;
}
