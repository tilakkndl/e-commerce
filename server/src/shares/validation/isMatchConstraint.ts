import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

 export function Match(property: string, validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions as ValidationOptions,
            constraints: [property],
            validator: MatchConstraint,
        });
    };
}

@ValidatorConstraint({name: 'Match'})
 class MatchConstraint implements ValidatorConstraintInterface {

    validate(value: string, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value === relatedValue;
    }

}
