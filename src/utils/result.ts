export type Result =
  | { result?: unknown; error: Error }
  | { result: unknown; error?: Error };

export function ok(result: unknown): Result {
  return { error: undefined, result };
}

export function err(error: string): Result {
  return { error: new Error(error), result: undefined };
}
