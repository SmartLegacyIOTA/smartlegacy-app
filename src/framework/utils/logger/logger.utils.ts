import Constants from "expo-constants";
import { Level, Meta } from "@/src/framework/utils/logger/logger.type";

const LEVEL_RANK: Record<Level, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

// Ajusta el nivel por entorno
const DEFAULT_LEVEL: Level = __DEV__ ? "debug" : "info";

// Si quieres forzar nivel por EAS env:
// EXPO_PUBLIC_LOG_LEVEL=debug|info|warn|error
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

function safeJson(value: any) {
  try {
    return JSON.stringify(
      value,
      (_k, v) => (typeof v === "bigint" ? v.toString() : v),
      2,
    );
  } catch (e) {
    return `<<unserializable meta: ${String(e)}>>`;
  }
}

function formatHeader(level: Level, scope?: string) {
  const lvl = level.toUpperCase().padEnd(5, " ");
  const tag = scope ? `${app}/${scope}` : app;
  return `[${now()}] ${lvl} ${tag}`;
}

export function print(
  level: Level,
  scope: string | undefined,
  msg: string,
  meta?: Meta,
) {
  if (!shouldLog(level)) return;

  const header = formatHeader(level, scope);

  // Mensaje siempre en una línea
  const line = `${header} — ${msg}`;

  // Objetos en bloque separado para que Metro no lo mezcle
  if (meta && Object.keys(meta).length > 0) {
    const metaBlock = safeJson(meta);

    if (level === "error") {
      console.error(line);
      console.error(metaBlock);
    } else if (level === "warn") {
      console.warn(line);
      console.warn(metaBlock);
    } else {
      console.log(line);
      console.log(metaBlock);
    }
  } else {
    if (level === "error") console.error(line);
    else if (level === "warn") console.warn(line);
    else console.log(line);
  }
}
