// const { chromium } = require('playwright');
// const { inquirer } = require('inquirer');
import inquirer from 'inquirer';
import { chromium } from 'playwright';


const getChoice = async () =>
    await inquirer
        .prompt([
            {
                type: "input",
                name: "dish",
                message: "What dish do you want to cook?"
            },
            {
                type: "list",
                name: "website",
                message: "What webpage do you want to use?",
                choices: ['kwestia smaku', 'allrecipes']
            }
        ])
        .then((answers) => {
            // console.log({answers});
            return answers;
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log("Your console environment is not supported!")
            } else {
                console.log(error)
            }
        })


const { dish } = await getChoice();
console.log(dish);





; (async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://www.kwestiasmaku.com/');
    await page.locator('[name="search_api_views_fulltext"]').type(dish);
    await page.locator('[id="edit-submit-wyniki-wyszukiwania"]').click();
    const content = await page.locator('[class="field field-name-title field-type-ds field-label-hidden"]');
    // await content.first().click();
    await content.first().locator('a:visible').click();
    // console.log(content);
    const ingredients = await page.locator('[class="field field-name-field-skladniki field-type-text-long field-label-hidden"]');
    // await ingredients.scrollIntoViewIfNeeded();
    const ingredients_text = await ingredients.textContent();

    const preparation = await page.locator('[class="group-przepis field-group-div"]');
    await preparation.scrollIntoViewIfNeeded();
    const preparation_text = await preparation.textContent();

    console.log(ingredients_text);
    console.log(preparation_text);


    await page.screenshot({ path: 'recipes.png' });

    await browser.close();
})()

