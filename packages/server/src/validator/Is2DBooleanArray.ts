import { ValidationOptions, registerDecorator } from 'class-validator';

const Is2DBooleanArray =
  (validationOptions?: ValidationOptions) =>
  (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'is2DBooleanArray',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            Array.isArray(value) &&
            value.every(
              (row) =>
                Array.isArray(row) &&
                row.every((item) => typeof item === 'boolean'),
            )
          );
        },
      },
    });
  };

export default Is2DBooleanArray;
