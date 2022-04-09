import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { classToPlain } from "class-transformer";
import { map, Observable } from "rxjs";

@Injectable()
export class TransformInterceptor implements NestInterceptor {

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> {
    return next.handle().pipe(map(data => classToPlain(data)));
  }
}