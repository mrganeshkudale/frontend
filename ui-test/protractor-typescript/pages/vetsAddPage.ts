import { FedexBasePage, timeout } from 'qcoe-fedex-ui-test-common';

const route = 'vets/add';
const selectors = {
    firstNameTbx : {id: 'firstName'},
    lastNameTbx : {id: 'lastName'},
    specialitiesDropDown : {id: 'specialties'},
    saveVetButton : {css: '.col-sm-offset-2.col-sm-10 button:nth-child(3)'}
};

class VetsAddPage extends FedexBasePage {

    constructor (){
        super (selectors, route);
    }

    async addVet (test: unknown, vet) {
        return this.logStep(`Add vet '${vet.firstName} ${vet.lastName}'`, test, async () => {
            await this.waitForElementVisible('firstNameTbx', timeout.SHORT);

            this.log(`with name '${vet.firstName}, ${vet.lastName}'`)
            await this.getElement('firstNameTbx').sendKeys(vet.firstName);
            await this.getElement('lastNameTbx').sendKeys(vet.lastName);

            this.log(`and speciality '${vet.speciality}'`)
            await this.getElement('specialitiesDropDown').sendKeys(vet.speciality);

            await this.getElement('saveVetButton').click();
            return await this.waitForElementInVisible('saveVetButton', timeout.SHORT);
        });
    }
}

export const vetsAddPage = new VetsAddPage();
