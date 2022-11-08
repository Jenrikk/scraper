const { chromium } = require('playwright');

;(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://www.kwestiasmaku.com/');
    await page.locator('[name="search_api_views_fulltext"]').type('chicken');
    await page.locator('[id="edit-submit-wyniki-wyszukiwania"]').click();
    const content = await page.locator('[class="field field-name-title field-type-ds field-label-hidden"]');
    // await content.first().click();
    await content.first().locator('a:visible').click();
    // console.log(content);
    const ingredients =  await page.locator('[class="field field-name-field-skladniki field-type-text-long field-label-hidden"]');
    // await ingredients.scrollIntoViewIfNeeded();
    const ingredients_text = await ingredients.textContent();

    const preparation =  await page.locator('[class="group-przepis field-group-div"]');
    await preparation.scrollIntoViewIfNeeded();
    const preparation_text = await preparation.textContent();

    console.log(ingredients_text);
    console.log(preparation_text);
    

    await page.screenshot({ path: 'recipes.png'});

    await browser.close();
})()



// ;(async () => {
//     const browser = await chromium.launch();
//     const page = await browser.newPage();
//     await page.goto('https://www.epicurious.com/search');
//     await page.locator('#onetrust-accept-btn-handler').click();
//     await page.locator('[name="terms"]').type('chicken');
//     await page.locator('[class="submit"]').click();
//     // await page.locator('[class="recipe-content-card"]').waitFor();
//     const content = await page.textContent('[data-reactid="68"]');
//     console.log(content.includes('chicken'));
    
//     // await page.waitForLoadState('networkidle');
//     // await page.waitForNavigation({waitUntil: 'networkidle'});

//     await page.screenshot({ path: 'recipes.png'});

//     await browser.close();
// })()