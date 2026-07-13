export const ROLE = ["super", "admin", "user"] as const
export type Role = typeof ROLE[number]

export const PAYMENT_METHOD = ["Bank", "bKash", "Rocket", "Nagad"] as const
export type PaymentMethod = typeof PAYMENT_METHOD[number]