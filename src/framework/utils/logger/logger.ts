import { Meta } from "@/src/framework/utils/logger/logger.type";
import { print } from "@/src/framework/utils/logger/logger.utils";

export interface Logger {
  debug: (msg: string, meta?: Meta) => void;
  info: (msg: string, meta?: Meta) => void;
  warn: (msg: string, meta?: Meta) => void;
  error: (msg: string, meta?: Meta) => void;
  scope: (scope: string) => Logger;
}

export const logger: Logger = {
  debug: (msg, meta) => print("debug", undefined, msg, meta),
  info: (msg, meta) => print("info", undefined, msg, meta),
  warn: (msg, meta) => print("warn", undefined, msg, meta),
  error: (msg, meta) => print("error", undefined, msg, meta),
  scope: (scope: string) => ({
    debug: (msg, meta) => print("debug", scope, msg, meta),
    info: (msg, meta) => print("info", scope, msg, meta),
    warn: (msg, meta) => print("warn", scope, msg, meta),
    error: (msg, meta) => print("error", scope, msg, meta),
    scope: (sub: string) => logger.scope(`${scope}/${sub}`),
  }),
};
