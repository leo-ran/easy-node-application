import {HttpContext, HttpsServer} from "@easy-node/server";

export class _HttpsServer extends HttpsServer{
  public handlerResponse(context: HttpContext): void {}
}