const { Builder, By, Key, util, WebDriver, until } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const proxy = require('selenium-webdriver/proxy')
const options = new chrome.Options();
require('dotenv').config();

const URL = "https://www.epicgames.com/id/register/date-of-birth";

options.addArguments(`user-data-dir=${process.env.PROFILE_DIR}`)
options.addArguments(`profile-directory=${process.env.PROFILE_NUM}`)

const proxyServer = process.env.PROXY;

function getRandom(min, max) {
    const floatRandom = Math.random()

    const difference = max - min

    // random between 0 and the difference
    const random = Math.round(difference * floatRandom)

    const randomWithinRange = random + min

    return randomWithinRange
}

const driver = new Builder()
    .forBrowser("chrome")
    // for using custom profile
    // .setChromeOptions(options)

    // for using proxy
    // .setProxy(proxy.manual({
    //     http: proxyServer,
    //     https: proxyServer
    // }))
    .build();

(async function index() {
    await driver.get(URL);
    firstPage();
})()



async function firstPage() {
    await driver
        .wait(until.elementLocated(By.id('month')), 20000)
        .click()
    await driver
        .wait(until.elementLocated(By.xpath("//li[text()='Aug']")), 10000)
        .click()
    await driver
        .wait(until.elementLocated(By.id('day')), 10000)
        .click()
    await driver
        .wait(until.elementLocated(By.xpath(`//li[text()='${getRandom(1, 30)}']`)), 10000)
        .click()
    await driver
        .wait(until.elementLocated(By.id('year')), 10000)
        .sendKeys(getRandom(1990, 2000), Key.RETURN)
}