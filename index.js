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
    // Selects the input field and type the ingredient
    await page.locator('[name="search_api_views_fulltext"]').type(dish);
    // Selects the search/submit and clicks on it
    await page.locator('[id="edit-submit-wyniki-wyszukiwania"]').click();
    // Selects ALL the recipes
    const content = page.locator('[class="field field-name-title field-type-ds field-label-hidden"]');
    // Selects the FIRST recipe, searches the first <a href="url">Link</a> and clicks on it
    await content.first().locator('a:visible').click();
    // you can also select second, third, etc recipe:
    // await content.nth(2).locator('a:visible').click();
    
    // After clicking (above line), our "page" has changed
    // Selects the DIV that contains the ingredients:
    const ingredients = page.locator('[class="field field-name-field-skladniki field-type-text-long field-label-hidden"]');
    // Optional step, in case of the screenshot is needed 
    // await ingredients.scrollIntoViewIfNeeded();
    const ingredients_text = await ingredients.textContent();

    // // Selects the DIV that contains the steps:
    const steps = page.locator('[class="group-przepis field-group-div"]');
    await steps.scrollIntoViewIfNeeded();
    const preparation_text = await steps.textContent();

    console.log(ingredients_text);
    console.log(preparation_text);


    await page.screenshot({ path: 'recipes.png' });

    await browser.close();
})()

