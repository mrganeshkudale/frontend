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

    async navigateHome(context: unknown) {
      try {
          // If the home page is open then currentUrl will return a value, otherwise it won't
          await this.currentUrl();
      } catch(e){
        await this.logStep(`Navigate to home page`, context);
        await this.navigateRoute("menuBar", timeout.MEDIUM)
      }
    }

    async navigateOwnersAll(context: unknown) {
      await this.navigateHome(context)

        this.logStep(`Navigate through owners menu`,  context, async () => {

        await this.getElement("ownerMenu").click();
        await this.log("Opened menu..")

        await this.log("Click All option")
        await this.waitForElementClickable('ownerMenuAll', timeout.LONG);
        await this.getElement("ownerMenuAll").click();
      });
    }

    async navigateOwnersAdd(context: unknown) {
      await this.navigateHome(context)

      this.logStep(`Navigate through owners menu`,  context, async () => {

        await this.getElement("ownerMenu").click();
        await this.log("Opened menu..")

        await this.log("Click Add option")
        await this.waitForElementClickable('ownerMenuAdd', timeout.LONG);
        await this.getElement("ownerMenuAdd").click();
      });
    }

    async navigateVetsAll(context: unknown) {
      await this.navigateHome(context)

      await this.logStep(`Navigate through vets menu`, context, async () => {

        await this.getElement("vetsMenu").click();
        await this.log("Opened menu..")

        await this.log("Click All option");
        await this.waitForElementClickable('vetsMenuAll', timeout.LONG);
        await this.getElement("vetsMenuAll").click();
      });
    }

    async navigateVetsAdd(context: unknown) {
      this.navigateHome(context)

      await this.logStep(`Navigate through vets menu`, context, async () => {

        await this.getElement("vetsMenu").click();
        await this.log("Opened menu..")

        await this.log("Click Add option")
        await this.waitForElementClickable('vetsMenuAdd', timeout.LONG);
        await this.getElement("vetsMenuAdd").click();
      });
    }
}

let mainMenu; export default mainMenu = new MainMenu()
