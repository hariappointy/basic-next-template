type LogLevel = "info" | "warn" | "error";

function log(level: LogLevel, message: string, meta?: Record<string, unknown>): void {
  const payload = meta ? ` ${JSON.stringify(meta)}` : "";
  const timestamp = new Date().toISOString();

  if (level === "error") {
    console.error(`[${timestamp}] ${message}${payload}`);
    return;
  }

  if (level === "warn") {
    console.warn(`[${timestamp}] ${message}${payload}`);
    return;
  }

  console.info(`[${timestamp}] ${message}${payload}`);
}

export const logger = {
  info(message: string, meta?: Record<string, unknown>) {
    log("info", message, meta);
  },
  warn(message: string, meta?: Record<string, unknown>) {
    log("warn", message, meta);
  },
  error(message: string, meta?: Record<string, unknown>) {
    log("error", message, meta);
  },
};
