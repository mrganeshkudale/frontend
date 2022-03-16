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

class MainMenu {

    constructor () {
      this.page = new FedexBasePage(selectors, route);
    }

    async navigateHome(test) {
      try {
          // If the home page is open then currentUrl will return a value, otherwise it won't
          await this.page.currentUrl();
      } catch(e){
        await this.page.logStep(`Navigate to home page`, test, async () => {
            await this.page.navigateRoute("menuBar", timeout.LONG)
        });
      }
    }

    async navigateOwnersAll(test) {
      await this.navigateHome(test)

      return await this.page.logStep(`Navigate through owners menu`, test, async () => {

        await this.page.getElement("ownerMenu").click();
        this.page.log("Opened menu..")
        await this.page.waitForElementClickable('ownerMenuAll', timeout.LONG);

        this.page.log("Click All option")
        await this.page.getElement("ownerMenuAll").click();
      });
    }

    async navigateOwnersAdd(test) {
      await this.navigateHome(test)

      return await this.page.logStep(`Navigate through owners menu`, test, async () => {

        await this.page.getElement("ownerMenu").click();
        this.page.log("Opened menu..")
        await this.page.waitForElementClickable('ownerMenuAdd', timeout.LONG);

        this.page.log("Click Add option")
        await this.page.getElement("ownerMenuAdd").click();
      });
    }

    async navigateVetsAll(test) {
      await this.navigateHome(test)

      return await this.page.logStep(`Navigate through vets menu`, test, async () => {

        await this.page.getElement("vetsMenu").click();
        this.page.log("Opened menu..")
        await this.page.waitForElementClickable('vetsMenuAll', timeout.LONG);

        this.page.log("Click All option")
        await this.page.getElement("vetsMenuAll").click();
      });
    }

    async navigateVetsAdd(test) {
      this.navigateHome(test)

      return await this.page.logStep(`Navigate through vets menu`, test, async () => {

        await this.page.getElement("vetsMenu").click();
        this.page.log("Opened menu..")
        await this.page.waitForElementClickable('vetsMenuAdd', timeout.LONG);

        this.page.log("Click All option")
        await this.page.getElement("vetsMenuAdd").click();
      });
    }
}

let mainMenu; export default mainMenu = new MainMenu()
