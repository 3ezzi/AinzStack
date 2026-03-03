export type ActionErrorCode =
  | "NOT_IMPLEMENTED"
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "INTEGRATION_NOT_CONFIGURED"
  | "INTERNAL_ERROR";

export interface ActionError {
  code: ActionErrorCode;
  message: string;
}

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ActionError };

export function notImplementedAction<T>(message: string): ActionResult<T> {
  return {
    ok: false,
    error: {
      code: "NOT_IMPLEMENTED",
      message,
    },
  };
}
