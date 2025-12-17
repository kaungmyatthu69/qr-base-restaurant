import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { z, ZodError } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: z.Schema) {}
  transform(value: unknown, metadata: ArgumentMetadata) {
    console.log('value pipe ', value);
    if (value === undefined) {
      value = {};
    }
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Input validation failed against schema definition.',
          validation: {
            errors: error.issues.map((err) => ({
              field: err.path.join('.'),
              reason: err.message,
              code: err.code,
            })),
          },
        });
      }
      // For non-Zod errors, throw a generic server error
      throw new BadRequestException('Validation failed');
    }
  }
}
