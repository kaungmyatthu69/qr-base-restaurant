import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseWrapperInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data === undefined) {
          return {
            success: true,
            data: {},
            timestamp: new Date().toISOString(),
          };
        }

        return {
          success: true,
          data: data,
        };
      }),
    );
  }
}
