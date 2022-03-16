import { FedexBasePage, timeout } from 'qcoe-fedex-ui-test-common';

const route = 'vets/add';

const selectors = {
    firstNameTbx : {id: 'firstName'},
    lastNameTbx : {id: 'lastName'},
    specialitiesDropDown : {id: 'specialties'},
    saveVetButton : {css: '.col-sm-offset-2.col-sm-10 button:nth-child(3)'}
};

class VetsAddPage {

    constructor () {
      this.page = new FedexBasePage(selectors, route);
    }

    async addVet (test, vet) {
        return this.page.logStep(`Add vet '${vet.firstName} ${vet.lastName}'`, test, async () => {
            await this.page.waitForElementVisible('firstNameTbx', timeout.SHORT);

            this.page.log(`with name '${vet.firstName}, ${vet.lastName}'`)
            await this.page.getElement('firstNameTbx').sendKeys(vet.firstName);
            await this.page.getElement('lastNameTbx').sendKeys(vet.lastName);

            this.page.log(`and speciality '${vet.speciality}'`)
            await this.page.getElement('specialitiesDropDown').sendKeys(vet.speciality);

            await this.page.getElement('saveVetButton').click();
            return await this.page.waitForElementInVisible('saveVetButton', timeout.SHORT);
        });
    }
}


let vetsAddPage; export default vetsAddPage = new VetsAddPage()
