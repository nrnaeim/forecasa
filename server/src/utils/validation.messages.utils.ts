//?==================================================================
//? Validation Messages
//?==================================================================
type DataType = "string" | "number" | "array" | "boolean" | "ISO date string"
export const INPUT_VALIDATION_MESSAGES = {
    //*==== Type and Requirement ==========================================
    REQUIRE: (field: string) => `${field} is required`,
    TYPE: (field: string, type: DataType) => `${field} must be ${type}`,
    REQUIRE_TYPE: (field: string, type: DataType) => `${field} is required and must be ${type}`,
    INVALID: (field: string) => `Invalid ${field}`,

    //*==== String =========================================================
    MIN_LENGTH: (field: string, count: number) => `${field} must be at least ${count} character(s)`,
    MAX_LENGTH: (field: string, count: number) => `${field} must be at most ${count} character(s)`,
    EXACT_LENGTH: (field: string, count: number) => `${field} must have exactly ${count} character(s)`,

    //*==== Number ==========================================================
    MIN_VALUE: (field: string, count: number) => `${field} must be at least ${count}`,
    MAX_VALUE: (field: string, count: number) => `${field} must be at most ${count}`,
    EXACT_VALUE: (field: string, count: number) => `${field} must be exactly ${count}`,

    POSITIVE: (field: string) => `${field} must be a positive number`,
    NEGATIVE: (field: string) => `${field} must be a negative number`,
    INTEGER: (field: string) => `${field} must be a whole number`,
    NON_ZERO: (field: string) => `${field} must not be zero`,

    //*==== Array ==========================================================
    MIN_ITEMS: (field: string, count: number) => `${field} must have at least ${count} item(s)`,
    MAX_ITEMS: (field: string, count: number) => `${field} must have at most ${count} item(s)`,
    EXACT_ITEMS: (field: string, count: number) => `${field} must have exactly ${count} item(s)`,
    ENUM: (field: string, values: readonly string[]) => `${field} must be ${values.join(" or ")}`,

    //*==== Password ==========================================================
    PASSWORD_MISMATCH: "Confirm password does not match",
} as const;