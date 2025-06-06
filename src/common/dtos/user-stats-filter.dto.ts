import { IsOptional, IsEnum, IsString, IsDateString, IsBoolean} from 'class-validator';
import { ValidRoles } from 'src/auth/interfaces';

export class UserStatsFilterDto {
  @IsOptional()
  @IsEnum(ValidRoles)
  role?: ValidRoles;

  @IsOptional()
  @IsDateString()
  dateFrom?: string;

  @IsOptional()
  @IsDateString()
  dateTo?: string;

  @IsOptional()
  @IsString()
  userName?: string;
}
