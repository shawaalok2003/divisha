const { APPLICATION_URLS, LIGHT_THEME, DARK_THEME } = require("../constants");

export const getThemeMode = (currentUrl = null) => {
    let theme = LIGHT_THEME;

    if (!currentUrl) return theme;

    Object.keys(APPLICATION_URLS).forEach((key) => {
        if (APPLICATION_URLS[key].url === currentUrl) {
            theme = APPLICATION_URLS[key].theme || LIGHT;
        }
    });

    return theme;
};

export const isLightThemeMode = (currentUrl) => getThemeMode(currentUrl) === LIGHT_THEME;

export const isDarkThemeMode = (currentUrl) => getThemeMode(currentUrl) === DARK_THEME;
