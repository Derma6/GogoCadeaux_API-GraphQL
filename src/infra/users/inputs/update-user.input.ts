import { RegisterUserInput } from '../../auth/inputs/register-user.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType('UpdateUserInput', { description: 'Update users input' })
export class UpdateUserInput extends PartialType(RegisterUserInput) {}
