import { FedexBasePage, timeout } from 'qcoe-fedex-ui-test-common';

const route = 'owners/add';

const selectors = {
    fnameTbx : {id: 'firstName'},
    lnameTbx : {id: 'lastName'},
    addressTbx : {id: 'address'},
    cityTbx : {id: 'city'},
    telephoneTbx : {id: 'telephone'},
    addOwnerBtn : {css: 'div.form-group button:nth-child(2)'},
    backBtn : {css: 'div.form-group button:nth-child(1)'}
};

class OwnersAddPage {

    constructor () {
      this.page = new FedexBasePage(selectors, route);
    }

    async addOwner (test, owner) {
        return await this.page.logStep(`Add owner`, test, async () => {
          this.page.log(`with name '${owner.firstName}, ${owner.lastName}'`)
            await this.page.waitForElementVisible('fnameTbx', timeout.SHORT);
            await this.page.getElement('fnameTbx').sendKeys(owner.firstName);
            await this.page.getElement('lnameTbx').sendKeys(owner.lastName)

            this.page.log(`address '${owner.address}, ${owner.city}'`)
            await this.page.getElement('addressTbx').sendKeys(owner.address)
            await this.page.getElement('cityTbx').sendKeys(owner.city)

            this.page.log(`and telephone number '${owner.telephone}'`)
            await this.page.getElement('telephoneTbx').sendKeys(owner.telephone)
            await this.page.getElement('addOwnerBtn').click()
        });
    }
}


let ownersAddPage; export default ownersAddPage = new OwnersAddPage()
