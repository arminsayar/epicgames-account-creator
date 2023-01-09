const { Builder, By, Key, util } = require("selenium-webdriver");

function idFinder(id) {
    driver.findElement(By.id(id));
};

function xpathFinder(tag, text) {
    driver.findElement(By.xpath(`//${tag}[text()='${text}']`));
};

function classFinder(className) {
    driver.findElement(By.className(className));
};

function nameFinder(name) {
    driver.findElement(By.name(name));
};

async function index() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://www.epicgames.com/id/register/date-of-birth");
    await setTimeout(async () => {
        await idFinder("year").sendKeys("1999");
        await idFinder("month").click();
        await xpathFinder("//li[text()='Jun']").click();
        await idFinder("day").click();
        await xpathFinder("//li[text()='8']").click();
        await idFinder("continue").click();
    }, 1000)
    await setTimeout(async () => {
        await classFinder("MuiButtonBase-root MuiIconButton-root MuiAutocomplete-popupIndicator").click();
        await xpathFinder("//li[text()='United States']").click();
        await nameFinder("name").sendKeys("Armin");
        await nameFinder("lastname").sendKeys("Real");
        await nameFinder("displayname").sendKeys("ArminIsReal");
        await nameFinder("email").sendKeys("armin@real.com");
        await nameFinder("password").sendKeys("Armin123456");
        await nameFinder("optIn").click();
        await nameFinder("tos").click();
        await idFinder("btn-submit").click();
    }, 1000)


}
index()