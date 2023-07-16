import { ValidationOptions, registerDecorator } from 'class-validator';

const Is2DCellStateArray =
  (validationOptions?: ValidationOptions) =>
  (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'Is2DCellStateArray',
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
                row.every((item) => item === 0 || item === 1 || item === 2),
            )
          );
        },
      },
    });
  };

export default Is2DCellStateArray;
