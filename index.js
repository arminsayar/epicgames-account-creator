const { Builder, By, Key, util, WebDriver, until } = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const proxy = require('selenium-webdriver/proxy')
const options = new chrome.Options();
require('dotenv').config();

const URL = "https://www.epicgames.com/id/register/date-of-birth";

options.addArguments(`user-data-dir=${process.env.PROFILE_DIR}`)
options.addArguments(`profile-directory=${process.env.PROFILE_NUM}`)

const proxyServer = process.env.PROXY;

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec']

function getRandom(min, max) {
    const floatRandom = Math.random()

    const difference = max - min

    // random between 0 and the difference
    const random = Math.round(difference * floatRandom)

    const randomWithinRange = random + min

    return randomWithinRange
}

function makeName(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
    await firstPage();
    await secPage();
})()



async function firstPage() {
    await driver
        .wait(until.elementLocated(By.id('month')), 20000)
        .click()
    await driver
        .wait(until.elementLocated(By.xpath(`//li[text()='${months[getRandom(0, 11)]}']`)), 10000)
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

async function secPage() {
    await driver
        .wait(until.elementLocated(By.className(
            'MuiInputBase-root MuiOutlinedInput-root MuiAutocomplete-inputRoot MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-adornedEnd MuiOutlinedInput-adornedEnd'
        )), 10000)
        .click()
    await driver
        .wait(until.elementLocated(By.id(`country-option-${getRandom(0, 239)}`)), 20000)
        .click()
    await driver
        .wait(until.elementLocated(By.name(`name`)), 20000)
        .sendKeys(`${makeName(getRandom(5, 10)).toLowerCase()}`)
    await driver
        .wait(until.elementLocated(By.name(`lastName`)), 20000)
        .sendKeys(`${makeName(getRandom(5, 10)).toLowerCase()}`)
    await driver
        .wait(until.elementLocated(By.name(`displayName`)), 20000)
        .sendKeys(`${makeName(getRandom(3, 16))}`)
    await driver
        .wait(until.elementLocated(By.name(`email`)), 20000)
        .sendKeys(`${makeName(getRandom(3, 10))}@${makeName(getRandom(5, 8))}.com`)
    await driver
        .wait(until.elementLocated(By.name(`password`)), 20000)
        .sendKeys(`${makeName(getRandom(7, 10))}${getRandom(0, 9)}${makeName(1).toUpperCase()}`)
    await driver
        .wait(until.elementLocated(By.name(`optIn`)), 20000)
        .click()
    await driver
        .wait(until.elementLocated(By.name(`tos`)), 20000)
        .click()
    await setTimeout(() => {
        driver
            .wait(until.elementLocated(By.id(`btn-submit`)), 20000)
            .click()
    }, 10000)
}