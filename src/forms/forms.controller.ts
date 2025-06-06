import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';

import { FormsService } from './forms.service';
import { CreateFormDto, UpdateFormDto } from './dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('forms')
@Auth()
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  @Auth(ValidRoles.admin)

  @ApiOperation({ summary: 'Create a new form' })
  @ApiResponse({ status: 201, description: 'Form successfully created' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({ type: CreateFormDto })
  
  create(
    @Body() createFormDto: CreateFormDto,
    @GetUser() user: User
  ) {
    return this.formsService.create(createFormDto, user);
  }

  @Get()

  @ApiOperation({ summary: 'Get all forms' })
  @ApiResponse({ status: 200, description: 'List of forms', type: [CreateFormDto] })

  findAll(@Query() paginationDto: PaginationDto) {
    return this.formsService.findAll(paginationDto);
  }

  @Get(':id')

  @ApiOperation({ summary: 'Get form by ID' })
  @ApiResponse({ status: 200, description: 'Form found', type: CreateFormDto })
  @ApiResponse({ status: 404, description: 'Form not found' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the form' })

  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.formsService.findOne(id);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)

  @ApiOperation({ summary: 'Update form by ID' })
  @ApiResponse({ status: 200, description: 'Form successfully updated', type: UpdateFormDto })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the form' })
  @ApiBody({ type: UpdateFormDto })

  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFormDto: UpdateFormDto,
    @GetUser() user: User,
  ) {
    return this.formsService.update(id, updateFormDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Delete form by ID' })
  @ApiResponse({ status: 200, description: 'Form successfully deleted' })
  @ApiResponse({ status: 404, description: 'Form not found' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the form' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.formsService.remove(id);
  }
}
