import { IncomingMessage, ServerResponse } from "node:http";

export type HandlerWithTypedBody<T> = (
  request: IncomingMessage & {
    body: T;
  },
  response: ServerResponse
) => Promise<void>;
