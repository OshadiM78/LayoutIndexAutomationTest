// Import requirement packages
require('./node_modules/chromedriver');
const assert = require('assert');
const { Builder, Key, By, until, Actions } = require('./node_modules/selenium-webdriver');

// Test Scenario - 01
describe('Users are able to search for an item using the search bar', function () {
    let driver;
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });
    it('Navigate to the homepage', async function() {
        // Load the page
        await driver.get('https://magento.softwaretestingboard.com/');
    });
    it('Put any search term in the search bar', async function() {
        await driver.findElement(By.id('search')).click();
        await driver.findElement(By.id('search')).sendKeys('Women’s Tops', Key.RETURN);
    })
    it('Validate that the results returned matches the search term', async function() {
        await driver.wait(until.elementLocated(By.xpath('//*[@id="maincontent"]/div[1]/h1/span')), 10000);
        let title = await driver.findElement(By.xpath('//*[@id="maincontent"]/div[1]/h1/span')).getText();
        assert.equal(title, 'Search results for: \'Women’s Tops\'');
    })
    // close the browser after running tests
    after(() => driver && driver.quit());
});

// Test Scenario - 02
describe('Users are able to filter search results under Women’s “Tops” section by CATEGORY and COLOR', function () {
    let driver;
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });
    it('Navigate to the homepage', async function () {
        // Load the page
        await driver.get('https://magento.softwaretestingboard.com/');
    });
    it('Click on “Tops” under Women category', async function () {
        await driver.wait(until.elementLocated(By.xpath('//*[@id="ui-id-4"]')), 20000);
        await driver.actions({ bridge: true }).move({ origin: driver.findElement(By.xpath('//*[@id="ui-id-4"]')) }).perform()
        await driver.wait(until.elementLocated(By.xpath('//*[@id="ui-id-9"]')), 20000);
        await driver.findElement(By.xpath('//*[@id="ui-id-9"]')).click();
    })
    it('Select any value from the CATEGORY and Select a any COLOR in the filter section', async function () {
        await driver.wait(until.elementLocated(By.xpath('//*[@id="narrow-by-list"]/div[1]/div[1]')),20000);
        await driver.findElement(By.xpath('//*[@id="narrow-by-list"]/div[1]/div[1]')).click();
        await driver.wait(until.elementLocated(By.xpath('//*[@id="narrow-by-list"]/div[1]/div[2]/ol/li[1]/a')), 20000);
        await driver.findElement(By.xpath('//*[@id="narrow-by-list"]/div[1]/div[2]/ol/li[1]/a')).click();

        await driver.wait(until.elementLocated(By.xpath('//*[@id="narrow-by-list"]/div[4]/div[1]')), 20000);
        await driver.findElement(By.xpath('//*[@id="narrow-by-list"]/div[4]/div[1]')).click();
        await driver.wait(until.elementLocated(By.xpath('//*[@id="narrow-by-list"]/div[4]/div[2]/div/div/a[1]/div')), 20000);
        await driver.findElement(By.xpath('//*[@id="narrow-by-list"]/div[4]/div[2]/div/div/a[1]/div')).click();
    })
    it('Validate that the results returned matches the filter criteria', async function () {
        await driver.wait(until.elementLocated(By.xpath('//*[@id="maincontent"]/div[1]/h1/span')), 20000);
        let title = await driver.findElement(By.xpath('//*[@id="maincontent"]/div[1]/h1/span')).getText();
        assert.equal(title, 'Tops');

        await driver.wait(until.elementLocated(By.xpath('//*[@id="layered-filter-block"]/div[2]/div[1]/ol/li[2]/span[2]')), 20000);
        let color = await driver.findElement(By.xpath('//*[@id="layered-filter-block"]/div[2]/div[1]/ol/li[2]/span[2]')).getText();
        assert.equal(color, 'Black');

        await driver.wait(until.elementLocated(By.xpath('//*[@id="layered-filter-block"]/div[2]/div[1]/ol/li[1]/span[2]')), 20000);
        let category = await driver.findElement(By.xpath('//*[@id="layered-filter-block"]/div[2]/div[1]/ol/li[1]/span[2]')).getText();
        assert.equal(category, 'Jackets');
    })
    // close the browser after running tests 
    after(() => driver && driver.quit());
});

// Test Scenario - 03
describe('Users are able to view the details of any clothing item from the Gear section and add them to the cart', function () {
    let driver;
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });
    it('Navigate to the homepage', async function() {
        // Load the page
        await driver.get('https://magento.softwaretestingboard.com/');
    });
    it('Navigate to gear section', async function() {
        await driver.wait(until.elementLocated(By.xpath('//*[@id="ui-id-6"]')), 10000);
        await driver.actions({ bridge:true}).move({origin: driver.findElement(By.xpath('//*[@id="ui-id-6"]'))}).perform()
        await driver.wait(until.elementLocated(By.xpath('//*[@id="ui-id-25"]')), 10000);
        await driver.findElement(By.xpath('//*[@id="ui-id-25"]')).click();
    })
    it('Select any item from the Gear section and add them to the cart', async function() {
        await driver.wait(until.elementLocated(By.xpath('//*[@id="maincontent"]/div[3]/div[1]/div[3]/ol/li[1]/div/a/span/span/img')), 10000);
        await driver.findElement(By.xpath('//*[@id="maincontent"]/div[3]/div[1]/div[3]/ol/li[1]/div/a/span/span/img')).click();
        await driver.wait(until.elementLocated(By.xpath('//*[@id="product-addtocart-button"]')), 10000);
        await driver.findElement(By.xpath('//*[@id="product-addtocart-button"]')).click();
    })
    it('Validate that the results returned matches the filter criteria', async function() {
        await driver.wait(until.elementLocated(By.xpath('//*[@id="maincontent"]/div[1]/div[2]/div/div/div')), 10000);
        let title = await driver.findElement(By.xpath('//*[@id="maincontent"]/div[1]/div[2]/div/div/div')).getText();
        assert.equal(title, 'You added Push It Messenger Bag to your shopping cart.');
    })
    // close the browser after running tests
    after(() => driver && driver.quit());
});