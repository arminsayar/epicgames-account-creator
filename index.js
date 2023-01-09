const { Builder, By, Key, util } = require("selenium-webdriver");

async function index() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://www.epicgames.com/id/register/date-of-birth");
    await setTimeout(async () => {
        await driver.findElement(By.id("year")).sendKeys("1999");
        await driver.findElement(By.id("month")).click();
        await driver.findElement(By.xpath("//li[text()='Jun']")).click();
        await driver.findElement(By.id("day")).click();
        await driver.findElement(By.xpath("//li[text()='8']")).click();
        await driver.findElement(By.id("continue")).click();
    }, 1000)
    await setTimeout(async () => {
        await driver.findElement(By.className("MuiButtonBase-root MuiIconButton-root MuiAutocomplete-popupIndicator")).click();
        await driver.findElement(By.xpath("//li[text()='United States']")).click();
        await driver.findElement(By.name("name")).sendKeys("Armin");
        await driver.findElement(By.name("lastname")).sendKeys("Real");
        await driver.findElement(By.name("displayname")).sendKeys("ArminIsReal");
        await driver.findElement(By.name("email")).sendKeys("armin@real.com");
        await driver.findElement(By.name("password")).sendKeys("Armin123456");
        await driver.findElement(By.name("optIn")).click();
        await driver.findElement(By.name("tos")).click();
        await driver.findElement(By.id("btn-submit")).click();
    }, 1000)


}
index()