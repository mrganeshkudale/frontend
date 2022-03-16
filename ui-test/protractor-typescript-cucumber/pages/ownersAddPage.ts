import { FedexBasePage, timeout } from 'qcoe-fedex-ui-test-common';

const route = 'owners/add';

const selector = {
    fnameTbx : {id: 'firstName'},
    lnameTbx : {id: 'lastName'},
    addressTbx : {id: 'address'},
    cityTbx : {id: 'city'},
    telephoneTbx : {id: 'telephone'},
    addOwnerBtn : {css: 'div.form-group button:nth-child(2)'},
    backBtn : {css: 'div.form-group button:nth-child(1)'}
};

class OwnersAddPage extends FedexBasePage {

    constructor (){
        super (selector, route);
    }

    public async addOwner(owner, context?: unknown): Promise<unknown> {
        return await this.logStep('Add new owner', context, async () => {
            await this.log(`with name '${owner.firstName}, ${owner.lastName}'`)
            await this.waitForElementVisible('fnameTbx', timeout.SHORT);
            await this.getElement('fnameTbx').sendKeys(owner.firstName);
            await this.getElement('lnameTbx').sendKeys(owner.lastName)

            await this.log(`address '${owner.address}, ${owner.city}'`)
            await this.getElement('addressTbx').sendKeys(owner.address)
            await this.getElement('cityTbx').sendKeys(owner.city)

            await this.log(`and telephone number '${owner.telephone}'`)
            await this.getElement('telephoneTbx').sendKeys(owner.telephone)
            await this.getElement('addOwnerBtn').click()
        });
    }
}

export const ownersAddPage = new OwnersAddPage();
