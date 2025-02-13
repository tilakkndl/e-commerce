import { ClassConstructor, plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";

const validationError = async<T extends object> (
  input: T 
): Promise<ValidationError[] | false> => {
  const errors = await validate(input, {
    validationError: { target: true },
  });


  if (errors.length) {
    return errors;
  }

  return false;
};

export const RequestValidator = async <T extends object>(
  type: ClassConstructor<T>,
  body: T
): Promise<{ errors: boolean | string;}> => {
  const input = plainToClass(type, body);

  const errors = await validationError(input);
  if (errors) {
    const errorMessage = errors
      .map((error: ValidationError) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (Object as any).values(error.constraints)
      )
      .join(", ");
    return { errors: errorMessage };
  }

  return { errors: false };
};