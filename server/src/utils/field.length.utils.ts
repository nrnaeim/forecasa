//?==================================================================================
//? Input Field Length
//?==================================================================================
export const INPUT_FIELD_LENGTH = {
    //*==== Common ========================================================
    COMMON: {
        ID: { MIN: 1, MAX: 100 },
        UUID: { MIN: 36, MAX: 36 },
        SLUG: { MIN: 2, MAX: 255 },
        CODE: { MIN: 2, MAX: 50 },
        REFERENCE: { MIN: 2, MAX: 100 },
    },

    //*==== Authentication ========================================================
    AUTH: {
        EMAIL: { MIN: 5, MAX: 254 },
        PASSWORD: { MIN: 8, MAX: 72 },
        OTP: { MIN: 6, MAX: 6 },
        TOKEN: { MIN: 100, MAX: 2048 },
        REFRESH_TOKEN: { MIN: 100, MAX: 2048 },
        VERIFICATION_CODE: { MIN: 4, MAX: 10 },
    },

    //*==== User ========================================================
    USER: {
        FIRST_NAME: { MIN: 2, MAX: 50 },
        LAST_NAME: { MIN: 2, MAX: 50 },
        MIDDLE_NAME: { MIN: 0, MAX: 50 },
        FULL_NAME: { MIN: 2, MAX: 100 },
        DISPLAY_NAME: { MIN: 2, MAX: 100 },
        USERNAME: { MIN: 3, MAX: 30 },
        NICKNAME: { MIN: 2, MAX: 50 },
        PHONE: { MIN: 7, MAX: 15 },
        BIO: { MIN: 0, MAX: 1000 },
        PROFESSION: { MIN: 2, MAX: 100 },
        DESIGNATION: { MIN: 2, MAX: 100 },
        AVATAR_ALT: { MIN: 0, MAX: 255 },
    },

    //*==== Address ========================================================
    ADDRESS: {
        LINE: { MIN: 2, MAX: 255 },
        CITY: { MIN: 2, MAX: 100 },
        STATE: { MIN: 2, MAX: 100 },
        COUNTRY: { MIN: 2, MAX: 100 },
        POSTAL_CODE: { MIN: 3, MAX: 20 },
    },

    //*==== Organization ========================================================
    ORG: {
        COMPANY_NAME: { MIN: 2, MAX: 200 },
        BRAND_NAME: { MIN: 2, MAX: 100 },
        DEPARTMENT_NAME: { MIN: 2, MAX: 100 },
        ROLE_NAME: { MIN: 2, MAX: 50 },
        PERMISSION_NAME: { MIN: 2, MAX: 100 },
    },

    //*==== Product ========================================================
    PRODUCT: {
        NAME: { MIN: 2, MAX: 255 },
        CATEGORY_NAME: { MIN: 2, MAX: 100 },
        SUBCATEGORY_NAME: { MIN: 2, MAX: 100 },
        BRAND: { MIN: 2, MAX: 100 },
        MODEL: { MIN: 2, MAX: 100 },
        SKU: { MIN: 2, MAX: 100 },
        BARCODE: { MIN: 6, MAX: 50 },
        TAG: { MIN: 2, MAX: 50 },
        UNIT: { MIN: 1, MAX: 20 },
    },

    //* ===== Content =====
    CONTENT: {
        TITLE: { MIN: 2, MAX: 200 },
        SUBTITLE: { MIN: 2, MAX: 300 },
        SUMMARY: { MIN: 0, MAX: 500 },
        DESCRIPTION: { MIN: 0, MAX: 5000 },
        BODY: { MIN: 0, MAX: 200000 },
        COMMENT: { MIN: 1, MAX: 2000 },
        REVIEW: { MIN: 1, MAX: 2000 },
        MESSAGE: { MIN: 1, MAX: 5000 },
        ANSWER: { MIN: 1, MAX: 5000 },
        QUESTION: { MIN: 1, MAX: 1000 },
    },

    //* ===== Media =====
    MEDIA: {
        FILE_NAME: { MIN: 1, MAX: 255 },
        FILE_EXTENSION: { MIN: 1, MAX: 20 },
        ALT_TEXT: { MIN: 0, MAX: 255 },
        CAPTION: { MIN: 0, MAX: 500 },
    },

    //* ===== Web =====
    WEB: {
        URL: { MIN: 5, MAX: 8192 },
        DOMAIN: { MIN: 3, MAX: 255 },
    },

    //* ===== SEO =====
    SEO: {
        META_TITLE: { MIN: 2, MAX: 70 },
        META_DESCRIPTION: { MIN: 2, MAX: 160 },
        META_KEYWORD: { MIN: 2, MAX: 100 },
    },

    //* ===== Commerce =====
    COMMERCE: {
        COUPON_CODE: { MIN: 3, MAX: 50 },
        TRANSACTION_ID: { MIN: 5, MAX: 100 },
        ORDER_ID: { MIN: 5, MAX: 100 },
        INVOICE_ID: { MIN: 5, MAX: 100 },
    },

    //* ===== Social =====
    SOCIAL: {
        HASHTAG: { MIN: 2, MAX: 100 },
        HANDLE: { MIN: 2, MAX: 100 },
    },

    //* ===== Support =====
    SUPPORT: {
        SUBJECT: { MIN: 2, MAX: 200 },
        TICKET_ID: { MIN: 5, MAX: 100 },
    },

    //* ===== Location =====
    LOCATION: {
        CONTINENT: { MIN: 2, MAX: 50 },
        REGION: { MIN: 2, MAX: 100 },
    },

    //* ===== Misc =====
    MISC: {
        NOTE: { MIN: 0, MAX: 5000 },
        REASON: { MIN: 0, MAX: 1000 },
        STATUS: { MIN: 2, MAX: 50 },
    },
} as const;