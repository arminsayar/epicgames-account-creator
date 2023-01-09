const { Builder, By, Key, util } = require("selenium-webdriver");

async function index() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://www.epicgames.com/id/register/date-of-birth");
    await driver.findElement(By.id("year")).sendKeys("1999");
    await driver.findElement(By.id("month")).click();
    await driver.findElement(By.xpath("//li[text()='Jun']")).click();
    await driver.findElement(By.id("day")).click();
    await driver.findElement(By.xpath("//li[text()='8']")).click();
    await driver.findElement(By.id("continue")).click();
}
index()