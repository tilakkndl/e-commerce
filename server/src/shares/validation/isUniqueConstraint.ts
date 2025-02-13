import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { AppDataSource } from '@config/typeorm.config';

type IsUniqueConstraintsInput = {
  table: string;
  column: string;
};

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
class IsUniqueConstraint implements ValidatorConstraintInterface {
  async validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> {
    const { table, column } = validationArguments?.constraints[0] as IsUniqueConstraintsInput;

    const repository = AppDataSource.getRepository(table);
    const result = await repository.findOne({ where: { [column]: value } });
    return !result;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const {  column } = validationArguments?.constraints[0] as IsUniqueConstraintsInput;
    return `The ${column} already exists`;
  }
}


export function IsUnique(options: IsUniqueConstraintsInput, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions as ValidationOptions,
      constraints: [options],
      validator: IsUniqueConstraint,
    });
  };
}
