import Constants from "expo-constants";
import { Level, Meta } from "@/src/framework/utils/logger/logger.type";

const LEVEL_RANK: Record<Level, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const DEFAULT_LEVEL: Level = __DEV__ ? "debug" : "info";

const LOG_LEVEL =
  ((process.env.EXPO_PUBLIC_LOG_LEVEL as Level) || DEFAULT_LEVEL) ??
  DEFAULT_LEVEL;

const app = (Constants.expoConfig?.name ||
  Constants.manifest2?.extra?.expoClient?.name ||
  "APP") as string;

function now(): string {
  return new Date().toISOString();
}

function shouldLog(level: Level) {
  return LEVEL_RANK[level] >= LEVEL_RANK[LOG_LEVEL];
}

function formatHeader(level: Level, scope?: string) {
  const lvl = level.toUpperCase().padEnd(5, " ");
  const tag = scope ? `${app}/${scope}` : app;
  return `[${now()}] ${lvl} ${tag}`;
}

function formatMeta(meta: unknown): string | null {
  if (meta == null) return null;

  if (meta instanceof Error) {
    return meta.stack || meta.message;
  }

  if (typeof meta === "string") return meta;

  try {
    return JSON.stringify(meta, null, 2);
  } catch {
    return String(meta);
  }
}
const USE_CONSOLE_ERROR = !__DEV__;

export function print(
  level: Level,
  scope: string | undefined,
  msg: string,
  meta?: Meta,
) {
  try {
    if (!shouldLog(level)) return;

    const header = formatHeader(level, scope);
    const line = `${header} — ${msg}`;

    const metaBlock = formatMeta(meta);

    if (level === "error") {
      if (USE_CONSOLE_ERROR) {
        console.error(line);
        if (metaBlock && metaBlock !== "null") console.error(metaBlock);
      } else {
        console.log(line); // en dev: no RedBox
        if (metaBlock && metaBlock !== "null") console.log(metaBlock);
      }
      return;
    }

    if (level === "warn") {
      console.warn(line);
      if (metaBlock && metaBlock !== "null") console.warn(metaBlock);
      return;
    }

    console.log(line);
    if (metaBlock && metaBlock !== "null") console.log(metaBlock);
  } catch {}
}
