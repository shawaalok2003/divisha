const STARTUP_SESSION_LOCALSTORAGE_KEY = "G91ETOvA2TcruZNPu3wC3xsRjXFlJ7vk";

const INVESTOR_SESSION_LOCALSTORAGE_KEY = "CtpmxQlukpOmiaksRkxMTJBk8qT1ffwE";

export const setStartupSession = (token) => window.localStorage.setItem(STARTUP_SESSION_LOCALSTORAGE_KEY, token);

export const getStartupSession = () => window.localStorage.getItem(STARTUP_SESSION_LOCALSTORAGE_KEY);

export const clearStartupSession = () => window.localStorage.removeItem(STARTUP_SESSION_LOCALSTORAGE_KEY);

export const setInvestorSession = (token) => window.localStorage.setItem(INVESTOR_SESSION_LOCALSTORAGE_KEY, token);

export const getInvestorSession = () => window.localStorage.getItem(INVESTOR_SESSION_LOCALSTORAGE_KEY);

export const clearInvestorSession = () => window.localStorage.removeItem(INVESTOR_SESSION_LOCALSTORAGE_KEY);
