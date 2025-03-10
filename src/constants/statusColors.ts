export const statusColors = {
    WAITING_FOR_PAYMENT: { bg: "bg-orange-100", text: "text-orange-600" },
    PAYMENT_VERIFICATION: { bg: "bg-blue-100", text: "text-blue-600" },
    PROCESSING: { bg: "bg-yellow-100", text: "text-yellow-600" },
    ON_DELIVERY: { bg: "bg-purple-100", text: "text-purple-600" },
    COMPLETED: { bg: "bg-green-100", text: "text-green-600" },
    CANCELED: { bg: "bg-red-100", text: "text-red-600" },
} as const;