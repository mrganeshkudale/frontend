import { FedexBasePage, timeout } from 'qcoe-fedex-ui-test-common';

const route = '';
const selectors = {
  menuBar : {css: 'nav'},
  ownerMenu : {css: 'nav > div > ul > li:nth-child(2)'},
  vetsMenu : {css: 'nav > div > ul > li:nth-child(3)'},
  ownerMenuAll : {css: 'nav > div > ul > li.dropdown.open > ul > li:nth-child(1)'},
  ownerMenuAdd : {css: 'nav > div > ul > li.dropdown.open > ul > li:nth-child(2)'},
  vetsMenuAll : {css: 'nav > div > ul > li.dropdown.open > ul > li:nth-child(1)'},
  vetsMenuAdd : {css: 'nav > div > ul > li.dropdown.open > ul > li:nth-child(2)'}
};

class MainMenu extends FedexBasePage {

    constructor () {
        super (selectors, route);
    }

    async navigateHome(test) {
      try {
          // If the home page is open then currentUrl will return a value, otherwise it won't
          await this.currentUrl();
      } catch(e){
        await this.logStep(`Navigate to home page`, test, async () => {
            await this.navigateRoute("menuBar", timeout.LONG)
        });
      }
    }

    async navigateOwnersAll(test) {
      await this.navigateHome(test)

      return await this.logStep(`Navigate through owners menu`, test, async () => {

        await this.waitForElementClickable('ownerMenu', timeout.SHORT);
        await this.getElement("ownerMenu").click();
        this.log("Opened menu..")
        await this.waitForElementVisible('ownerMenuAll', timeout.SHORT);

        this.log("Click All option")
        await this.getElement("ownerMenuAll").click();
      });
    }

    async navigateOwnersAdd(test) {
      await this.navigateHome(test)

      return await this.logStep(`Navigate through owners menu`, test, async () => {

        await this.waitForElementClickable('ownerMenu', timeout.SHORT);
        await this.getElement("ownerMenu").click();
        this.log("Opened menu..")
        await this.waitForElementClickable('ownerMenuAdd', timeout.SHORT);

        this.log("Click Add option")
        await this.getElement("ownerMenuAdd").click();
      });
    }

    async navigateVetsAll(test) {
      await this.navigateHome(test)

      return await this.logStep(`Navigate through vets menu`, test, async () => {

        await this.waitForElementClickable('vetsMenu', timeout.SHORT);
        await this.getElement("vetsMenu").click();
        this.log("Opened menu..")
        await this.waitForElementClickable('vetsMenuAll', timeout.SHORT);

        this.log("Click All option")
        await this.getElement("vetsMenuAll").click();
      });
    }

    async navigateVetsAdd(test) {
      this.navigateHome(test)

      return await this.logStep(`Navigate through vets menu`, test, async () => {

        await this.waitForElementClickable('vetsMenu', timeout.SHORT);
        await this.getElement("vetsMenu").click();
        this.log("Opened menu..")
        await this.waitForElementClickable('vetsMenuAdd', timeout.SHORT);

        this.log("Click All option")
        await this.getElement("vetsMenuAdd").click();
      });
    }
}

let mainMenu; export default mainMenu = new MainMenu()
