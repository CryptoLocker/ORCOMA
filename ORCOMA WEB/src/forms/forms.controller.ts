import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';

import { FormsService } from './forms.service';
import { CreateFormDto, UpdateFormDto  } from './dto'
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('forms')
@Auth()
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  create(
    @Body() createFormDto: CreateFormDto,
    @GetUser() user: User
  ) {
    return this.formsService.create(createFormDto, user);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto) {
    return this.formsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.formsService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateFormDto: UpdateFormDto,
    @GetUser() user: User,
  ) {
    return this.formsService.update(id, updateFormDto, user);
  }

  @Delete(':id')
  @Auth( ValidRoles.admin, ValidRoles.superUser )
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.formsService.remove(id);
  }
}
