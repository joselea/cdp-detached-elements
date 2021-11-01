const { Builder, By, Key, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

(async function example() {
    let options = new edge.Options();
    options.setBinaryPath("C:\\Users\\joselea\\AppData\\Local\\Microsoft\\Edge SxS\\Application\\msedge.exe");
    let driver = edge.Driver.createSession(options);
    
    try {

        // Navigate to a sample app that creates detached elements
        await driver.get('https://captainbrosset.github.io/detached-elements/');

        // After navigation, make sure agents are enabled so we can listen to the events
        await driver.sendDevToolsCommand('DOM.enable');
        await driver.sendDevToolsCommand('DOM.getDocument');
        await driver.sendDevToolsCommand('EdgeDOMMemory.enable');
        await driver.sleep(1000);
        
        // Interact with webpage to create detached elements
        await driver.findElement(By.className('high-traffic')).sendKeys(Key.ENTER);
        await driver.sleep(3000);
        await driver.findElement(By.className('stop-traffic')).sendKeys(Key.ENTER);
        await driver.sleep(1000);
        
        // Optional
        let browser_details = await driver.sendAndGetDevToolsCommand('Browser.getVersion', {});
        console.log(browser_details);

        let {detachedNodesIds} = await driver.sendAndGetDevToolsCommand('EdgeDOMMemory.getDetachedNodesIds', {});
        console.log(`Found ${detachedNodesIds.length} detached elements`);
        
        // Optional, ids change each run so the numbers are not very helpful by themselves.
        console.log("Node ids: ", detachedNodesIds);

    }
    finally {
        await driver.quit();
    }
})();
