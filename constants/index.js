import CONFIG from "../config";
import { isDevEnv } from "../helpers";

export const STARTUP_PATH = `/startup`;
export const INVESTOR_PATH = `/investor`;
export const POLICY_PATH = `/policy`;
export const FAQS_PATH = `/faqs`;
export const SUPER_PATH = `/super`;
export const SEARCH_PATH = `/search`;

export const LIGHT_THEME = "light";
export const DARK_THEME = "dark";

export const APPLICATION_URLS = {
    HOME: { url: `/`, theme: DARK_THEME },
    ABOUT_US: { url: `/about-us`, theme: LIGHT_THEME },
    CONTACT_US: { url: `/contact-us`, theme: LIGHT_THEME },

    PRICING: { url: `/pricing`, theme: LIGHT_THEME },

    /* Startup Public Routes */
    STARTUP: { url: `${STARTUP_PATH}`, theme: LIGHT_THEME },
    STARTUP_REGISTER: { url: `${STARTUP_PATH}/register`, theme: LIGHT_THEME },
    STARTUP_LOGIN: { url: `${STARTUP_PATH}/login`, theme: LIGHT_THEME },
    STARTUP_FORGOT_PASSWORD: { url: `${STARTUP_PATH}/forgot-password`, theme: LIGHT_THEME },
    STARTUP_LISTING: { url: `${STARTUP_PATH}/listing`, theme: LIGHT_THEME },

    /* Startup Authenticated Routes */
    STARTUP_DASHBOARD: { url: `${STARTUP_PATH}/dashboard`, theme: LIGHT_THEME },
    STARTUP_BUSINESS_INFO: { url: `${STARTUP_PATH}/business-info`, theme: LIGHT_THEME },
    STARTUP_BUSINESS_INFO_TAXES_AND_REGISTRATIONS: { url: `${STARTUP_PATH}/business-info/taxes-and-registrations`, theme: LIGHT_THEME },
    STARTUP_BUSINESS_INFO_CATEGORY_AND_SERVICES: { url: `${STARTUP_PATH}/business-info/category-and-services`, theme: LIGHT_THEME },
    STARTUP_BUSINESS_INFO_OPERATION_AND_INTERESTS: { url: `${STARTUP_PATH}/business-info/operation-and-interests`, theme: LIGHT_THEME },
    STARTUP_LOCATION_INFO: { url: `${STARTUP_PATH}/location-info`, theme: LIGHT_THEME },
    STARTUP_SOCIAL: { url: `${STARTUP_PATH}/social`, theme: LIGHT_THEME },
    STARTUP_GALLERY: { url: `${STARTUP_PATH}/gallery`, theme: LIGHT_THEME },
    STARTUP_BANNER: { url: `${STARTUP_PATH}/banner`, theme: LIGHT_THEME },
    STARTUP_MEDIA: { url: `${STARTUP_PATH}/media`, theme: LIGHT_THEME },
    STARTUP_FUNDING: { url: `${STARTUP_PATH}/funding-info`, theme: LIGHT_THEME },
    STARTUP_ACCOMPLISHMENTS: { url: `${STARTUP_PATH}/accomplishments`, theme: LIGHT_THEME },
    STARTUP_TEAM: { url: `${STARTUP_PATH}/team`, theme: LIGHT_THEME },
    STARTUP_INCUBATION: { url: `${STARTUP_PATH}/incubation`, theme: LIGHT_THEME },
    STARTUP_CLIENTS: { url: `${STARTUP_PATH}/clients`, theme: LIGHT_THEME },
    STARTUP_ENQUIRIES: { url: `${STARTUP_PATH}/enquiries`, theme: LIGHT_THEME },
    STARTUP_DOCUMENTS: { url: `${STARTUP_PATH}/documents`, theme: LIGHT_THEME },
    STARTUP_SUBSCRIPTION: { url: `${STARTUP_PATH}/subscription`, theme: LIGHT_THEME },
    STARTUP_TRACTION: { url: `${STARTUP_PATH}/traction`, theme: LIGHT_THEME },
    STARTUP_PROFILE: { url: `${STARTUP_PATH}/profile`, theme: LIGHT_THEME },

    /* Investor Public Routes */
    INVESTOR: { url: `${INVESTOR_PATH}`, theme: LIGHT_THEME },
    INVESTOR_LOGIN: { url: `${INVESTOR_PATH}/login`, theme: LIGHT_THEME },
    INVESTOR_REGISTER: { url: `${INVESTOR_PATH}/register`, theme: LIGHT_THEME },

    /* Investor Authenticated Routes */
    INVESTOR_DASHBOARD: { url: `${INVESTOR_PATH}/dashboard`, theme: LIGHT_THEME },
    INVESTOR_OFFICE: { url: `${INVESTOR_PATH}/office`, theme: LIGHT_THEME },
    INVESTOR_MEMBER: { url: `${INVESTOR_PATH}/member`, theme: LIGHT_THEME },
    INVESTOR_STARTUP_PORTFOLIO: { url: `${INVESTOR_PATH}/startup-portfolio`, theme: LIGHT_THEME },
    INVESTOR_PREFERENCE: { url: `${INVESTOR_PATH}/preferences`, theme: LIGHT_THEME },
    INVESTOR_KYC: { url: `${INVESTOR_PATH}/kyc`, theme: LIGHT_THEME },

    /* Policies Routes */
    POLICY_PRIVACY: { url: `${POLICY_PATH}/privacy`, theme: LIGHT_THEME },
    POLICY_TERMSOFUSE: { url: `${POLICY_PATH}/termsofuse`, theme: LIGHT_THEME },
    POLICY_COMMUNITY_GUIDELINES: { url: `${POLICY_PATH}/community-guidelines`, theme: LIGHT_THEME },
    POLICY_CANCELLATION_REFUND: { url: `${POLICY_PATH}/cancellation-refund`, theme: LIGHT_THEME },
    POLICY_SHIPPING_AND_EXCHANGE: { url: `${POLICY_PATH}/shipping-and-exchange`, theme: LIGHT_THEME },

    /* FAQs Routes */
    FAQS_STARTUP: { url: `${FAQS_PATH}/startup`, theme: LIGHT_THEME },
    FAQS_INVESTOR: { url: `${FAQS_PATH}/investor`, theme: LIGHT_THEME },

    /* Super Public Routes */
    SUPER_LOGIN: { url: `${SUPER_PATH}/login`, theme: LIGHT_THEME },

    /* Super Authenticated Routes */
    SUPER_DASHBOARD: { url: `${SUPER_PATH}/dashboard`, theme: LIGHT_THEME },
    SUPER_INVESTORS: { url: `${SUPER_PATH}/investors`, theme: LIGHT_THEME },
};

export const SUPER_API_PATH = `/super`;
export const STARTUP_API_PATH = `/startup`;
export const INVESTOR_API_PATH = `/investor`;
export const PUBLIC_API_PATH = `/public`;

export const API_URLS = {
    BASE: `${CONFIG.API_URL}/v1`,
    STARTUP: `${STARTUP_API_PATH}`,
    INVESTOR: `${INVESTOR_API_PATH}`,
    PUBLIC: `${PUBLIC_API_PATH}`,
    SUPER: {
        LOGIN: `${SUPER_API_PATH}/login`,
        LOGINASINVESTOR: `${SUPER_API_PATH}/login-as-investor`,
        DETAILS: `${SUPER_API_PATH}/details`,
    },
    INVESTOR: {
        REGISTER: `${INVESTOR_API_PATH}/register`,
        LOGIN: `${INVESTOR_API_PATH}/login`,
        DETAILS: `${INVESTOR_API_PATH}/details`,
        ADD: `${INVESTOR_API_PATH}`,
        LIST: `${INVESTOR_API_PATH}`,
        OFFICE: {
            ADD: `${INVESTOR_API_PATH}-office`,
            LIST: `${INVESTOR_API_PATH}-office`,
            DETAILS: `${INVESTOR_API_PATH}-office`,
            UPDATE: `${INVESTOR_API_PATH}-office`,
            DELETE: `${INVESTOR_API_PATH}-office`,
        },
        MEMBER: {
            ADD: `${INVESTOR_API_PATH}-member`,
            LIST: `${INVESTOR_API_PATH}-member`,
            DETAILS: `${INVESTOR_API_PATH}-member`,
            UPDATE: `${INVESTOR_API_PATH}-member`,
            DELETE: `${INVESTOR_API_PATH}-member`,
        },
        STARTUP: {
            ADDEXTERNAL: `${INVESTOR_API_PATH}-startup/external`,
            ADDINTERNAL: `${INVESTOR_API_PATH}-startup/internal`,
            LIST: `${INVESTOR_API_PATH}-startup`,
            DETAILS: `${INVESTOR_API_PATH}-startup`,
            UPDATE: `${INVESTOR_API_PATH}-startup`,
            DELETE: `${INVESTOR_API_PATH}-startup`,
        },
        PREFERENCE: {
            DETAILS: `${INVESTOR_API_PATH}-preference`,
            UPDATE: `${INVESTOR_API_PATH}-preference`,
        },
        KYC: {
            DETAILS: `${INVESTOR_API_PATH}-kyc`,
            UPDATE: `${INVESTOR_API_PATH}-kyc`,
        },
    },
    SEARCH: {
        STARTUP: `${SEARCH_PATH}/startup`,
    },
};

export const SUBSCRIPTION_PLANS_PERIOD = {
    daily: "Day",
    weekly: "Week",
    monthly: "Month",
    yearly: "Year",
};

export const DEFAULT_DATE_FORMAT = "YYYY-MM-DD HH:mm:ss";

export const BUSINESS_MODEL_DATA = [
    {
        countryId: 1,
        name: "B2B - Business to Business",
        value: "b2b",
    },
    {
        countryId: 1,
        name: "B2C - Business to Consumer",
        value: "b2c",
    },
    {
        countryId: 1,
        name: "B2B2C - Business to Business to Customer",
        value: "b2b2c",
    },
    {
        countryId: 1,
        name: "C2C - Consumer to Consumer",
        value: "c2c",
    },
    {
        countryId: 1,
        name: "C2B - Consumer to Business",
        value: "c2b",
    },
    {
        countryId: 1,
        name: "B2A - Business to Administration",
        value: "b2a",
    },
    {
        countryId: 1,
        name: "C2A - Customer to Administration",
        value: "c2a",
    },
    {
        countryId: 1,
        name: "Other",
        value: "other",
    },
];

export const STARTUP_INTERESTS = [
    {
        value: "incubation",
        name: "Incubation",
    },
    {
        value: "acceleration",
        name: "Acceleration",
    },
    {
        value: "investment",
        name: "Investment",
    },
    {
        value: "techmentor",
        name: "Tech Mentorship",
    },
    {
        value: "marketingmentor",
        name: "Marketing Mentorship",
    },
    {
        value: "legalmentor",
        name: "Legal Mentorship",
    },
    {
        value: "operationmentor",
        name: "Operations Mentorship",
    },
    {
        value: "financialmentor",
        name: "Financials Mentorship",
    },
    {
        value: "cofounder",
        name: "Business Collabs: Co-Founder",
    },
];

export const STARTUP_STAGES = [
    {
        name: "Ideation",
        value: "ideation",
    },
    {
        name: "Validation",
        value: "validation",
    },
    {
        name: "Early Traction",
        value: "etraction",
    },
    {
        name: "Scaling",
        value: "scaling",
    },
];

export const STARTUP_FUNDINGS = [
    {
        name: "Crowd Funded",
        value: "crowd",
    },
    {
        name: "Pre-Seed Funded",
        value: "preseed",
    },
    {
        name: "Seed Funded",
        value: "seed",
    },
    {
        name: "Series A",
        value: "seriesa",
    },
    {
        name: "Series B",
        value: "seriesb",
    },
    {
        name: "Series C",
        value: "seriesc",
    },
    {
        name: "Series D",
        value: "seriesd",
    },
    {
        name: "Series E",
        value: "seriese",
    },
    {
        name: "Series F",
        value: "seriesf",
    },
    {
        name: "Series G",
        value: "seriesg",
    },
    {
        name: "Series H",
        value: "seriesh",
    },
];

export const STARTUP_TYPES = [
    {
        countryId: 1,
        name: "Unregistered",
        value: "unregistered",
    },
    {
        countryId: 1,
        name: "LLP - Limited Liability Partnership",
        value: "llp",
    },
    {
        countryId: 1,
        name: "Private Limited",
        value: "private",
    },
    {
        countryId: 1,
        name: "Partnership",
        value: "partnership",
    },
    {
        countryId: 1,
        name: "Sole Proprietorship",
        value: "sproprietorship",
    },
];

export const STARTUP_NATURES = [
    {
        countryId: 1,
        name: "Service",
        value: "service",
    },
    {
        countryId: 1,
        name: "Product",
        value: "product",
    },
    {
        countryId: 1,
        name: "Both",
        value: "both",
    },
];

export const STARTUP_INVESTMENT_NATURES = [
    {
        name: "Equity Dilution",
        value: "equity",
    },
    {
        name: "Debt Funding",
        value: "debt",
    },
    {
        name: "Convertible Debt",
        value: "convdebt",
    },
    {
        name: "Crowd-Funding",
        value: "crowdfund",
    },
    {
        name: "CSR",
        value: "csr",
    },
    {
        name: "All",
        value: "all",
    },
];

export const FUNDING_TYPES = [
    {
        name: "Crowd Funded",
        value: "crowd",
    },
    {
        name: "Pre-Seed Funded",
        value: "preseed",
    },
    {
        name: "Seed Funded",
        value: "seed",
    },
    {
        name: "Series A",
        value: "seriesa",
    },
    {
        name: "Series B",
        value: "seriesb",
    },
    {
        name: "Series C",
        value: "seriesc",
    },
    {
        name: "Series D",
        value: "seriesd",
    },
    {
        name: "Series E",
        value: "seriese",
    },
    {
        name: "Series F",
        value: "seriesf",
    },
    {
        name: "Series G",
        value: "seriesg",
    },
    {
        name: "Series H",
        value: "seriesh",
    },
];

export const INVESTMENT_BASIS = [
    {
        name: "Equity Dilution",
        value: "equity",
    },
    {
        name: "Debt Funding",
        value: "debt",
    },
    {
        name: "Convertible Debt",
        value: "convdebt",
    },
    {
        name: "Crowd-Funding",
        value: "crowdfund",
    },
    {
        name: "CSR",
        value: "csr",
    },
    {
        name: "All",
        value: "all",
    },
];

export const ALLOWED_SMS_COUNTRIES = [1];

export const OFFICE_TYPES = [
    {
        label: "Head Office",
        value: "head",
    },
    {
        label: "Branch Office",
        value: "branch",
    },
];

export const INVESTOR_MEMBER_TYPES = [
    {
        label: "Founding",
        value: "founding",
    },
    {
        label: "Other",
        value: "other",
    },
];

export const COMMON_STATUS_TYPES = [
    {
        label: "Active",
        value: "active",
    },
    {
        label: "Inactive",
        value: "inactive",
    },
];

export const FINANCIAL_TYPES = [
    {
        name: "Bootstrapped",
        value: "bootstrapped",
    },
    {
        name: "Funded",
        value: "funded",
    },
];

export const INVESTOR_TYPES = [
    {
        name: "Individual",
        value: "individual",
    },
    {
        name: "Angel Investor",
        value: "angel",
    },
    {
        name: "Venture Capitalist",
        value: "vc",
    },
    {
        name: "Private Equity",
        value: "pe",
    },
    {
        name: "Incubator",
        value: "incubator",
    },
    {
        name: "Accelerator",
        value: "accelerator",
    },
    {
        name: "Corporate / CSR",
        value: "corporate",
    },
];

export const NOMINEE_RELATIONS = [
    {
        name: "Wife",
        value: "wife",
    },
    {
        name: "Son",
        value: "son",
    },
    {
        name: "Daughter",
        value: "daughter",
    },
    {
        name: "Father",
        value: "father",
    },
    {
        name: "Mother",
        value: "mother",
    },
    {
        name: "Brother",
        value: "brother",
    },
    {
        name: "Sister",
        value: "sister",
    },
    {
        name: "Cousin",
        value: "cousin",
    },
    {
        name: "Other",
        value: "other",
    },
];

export const LOADER_TIMEOUTS = {
    oneSec: isDevEnv() ? 1000 : 0,
    twoSec: isDevEnv() ? 2000 : 0,
    threeSec: isDevEnv() ? 3000 : 0,
    fourSec: isDevEnv() ? 4000 : 0,
    fiveSec: isDevEnv() ? 5000 : 0,
    sixSec: isDevEnv() ? 6000 : 0,
    sevenSec: isDevEnv() ? 7000 : 0,
    eightSec: isDevEnv() ? 8000 : 0,
    nineSec: isDevEnv() ? 9000 : 0,
    tenSec: isDevEnv() ? 10000 : 0,
};

export const PAYMENT_METHODS = [
    {
        name: "Cash",
        value: "cash",
    },
    {
        name: "Card",
        value: "card",
    },
    {
        name: "UPI",
        value: "upi",
    },
    {
        name: "Cheque",
        value: "cheque",
    },
    {
        name: "Net Banking",
        value: "netbanking",
    },
    {
        name: "Bank Transfer",
        value: "banktransfer",
    },
];
