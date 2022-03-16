import { FedexBasePage, timeout } from 'qcoe-fedex-ui-test-common';

import Owner from "../model/owner"
import Pet from "../model/pet"

const route = 'owners';

const selectors = {
    ownersTable : {css: '.table.table-striped'},
    ownerNameList : {css: '.table-responsive td a'},
    petName : {css: '.table.table-striped .dl-horizontal dd:nth-child(2)'},
    petDob : {css: '.table.table-striped .dl-horizontal dd:nth-child(4)'},
    petType : {css: '.table.table-striped .dl-horizontal dd:nth-child(6)'}
};

class OwnersPage {

    constructor () {
      this.page = new FedexBasePage(selectors, route);
    }

    async getOwnerDetails(test, owner) {
        return await this.page.logStep(`Get owner details'`, test, async () => {
            let name = "";
            let address = "";
            let city = "";
            let telephone = "";

            await this.page.waitForElementVisible('ownersTable', timeout.SHORT);
            const nameList  = await this.page.getElements('ownerNameList');

            for (let index = 0; index < nameList.length; index += 1) {
                name = await nameList[index].getText();

                if(name === `${owner.firstName} ${owner.lastName}`) {
                    address = await this.page.getTableColumnText('ownersTable', index+1, 'Address');

                    city = await this.page.getTableColumnText('ownersTable', index+1, 'City');

                    telephone = await this.page.getTableColumnText('ownersTable', index+1, 'Telephone');
                    break;
                }
            }

            this.page.log(`Got owner details: '${name}, ${address}, ${city}, ${telephone}'`)
            return new Owner(name, address, city, telephone);
        })
    }

    async selectOwner (test, owner)  {
        this.page.logStep(`Select owner ${owner.name}'`, test, async () => {

            await this.page.waitForElementVisible('ownersTable', timeout.SHORT);

            const nameList  = await this.page.getElements('ownerNameList');
            for (let index = 0; index < nameList.length; index += 1) {
                const name = await nameList[index].getText();
                if(name === `${owner.name}`){
                    await nameList[index].click();
                    break;
                }
            }
        });
    }

    async getPetName (test) {
        return this.page.logStep(`Get pet name`, test, async () => {
            await this.page.waitForElementVisible('petName', timeout.SHORT);

            const name = await this.page.getElement('petName').getText();
            this.page.log(`Got pet name '${name}'`);
            return name;
        });
    }

    async getPetDob (test) {
        return this.page.logStep(`Get pet D.O.B`, test, async () => {
            await this.page.waitForElementVisible('petDob', timeout.SHORT);

            const dob = await this.page.getElement('petDob').getText();
            this.page.log(`Got pet DOB '${dob}'`);
            return dob;
        });
    }

    async getPetType (test) {
        return this.page.logStep(`Get pet type`, test, async () => {
            await this.page.waitForElementVisible('petType', timeout.SHORT);

            const type = await this.page.getElement('petType').getText();
            this.page.log(`Got pet type '${type}'`);
            return type;
        })
    }

    async getPetDetails (test) {
        return this.page.logStep(`Get pet details`, test, async () => {

            const name = await this.getPetName();
            const dob = await this.getPetDob();
            const type = await this.getPetType();

            return new Pet(name, dob, type);
        });
    }
}


let ownersPage; export default ownersPage = new OwnersPage()
