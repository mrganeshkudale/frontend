import { FedexBasePage, timeout } from 'qcoe-fedex-ui-test-common';

import Owner from "../model/owner";
import Pet from "../model/pet";

const route = 'owners';

const selector = {
    ownersTable : {css: '.table.table-striped'},
    ownerNameList : {css: '.table-responsive td a'},
    petName : {css: '.table.table-striped .dl-horizontal dd:nth-child(2)'},
    petDob : {css: '.table.table-striped .dl-horizontal dd:nth-child(4)'},
    petType : {css: '.table.table-striped .dl-horizontal dd:nth-child(6)'}
}

class OwnersPage extends FedexBasePage {

    constructor(){
        super(selector, route);
    }

    public async getOwnerDetails(test: unknown, owner): Promise<any> {
        return await this.logStep(`Get owner details'`, test, async () => {
            let name = "";
            let address = "";
            let city = "";
            let telephone = "";

            await this.waitForElementVisible('ownersTable', timeout.SHORT);
            const nameList  = await this.getElements('ownerNameList');

            for (let index = 0; index < nameList.length; index += 1) {
                name = await nameList[index].getText();

                if(name === `${owner.firstName} ${owner.lastName}`) {
                    address = await this.getTableColumnText('ownersTable', index+1, 'Address');

                    city = await this.getTableColumnText('ownersTable', index+1, 'City');

                    telephone = await this.getTableColumnText('ownersTable', index+1, 'Telephone');
                    break;
                }
            }

            this.log(`Got owner details: '${name}, ${address}, ${city}, ${telephone}'`)
            return new Owner(name, address, city, telephone);
        })
    }

    public async selectOwner (test: unknown, owner) {
        this.logStep(`Select owner ${owner.name}'`, test, async () => {

            await this.waitForElementVisible('ownersTable', timeout.SHORT);

            const nameList  = await this.getElements('ownerNameList');
            for (let index = 0; index < nameList.length; index += 1) {
                const name = await nameList[index].getText();
                if(name === `${owner.name}`){
                    await nameList[index].click();
                    break;
                }
            }
        });
    }

    public async getPetName (test: unknown): Promise<string> {
        return this.logStep(`Get pet name`, test, async () => {
            await this.waitForElementVisible('petName', timeout.SHORT);
            const name = await this.getElement('petName').getText();
            this.log(`Got pet name '${name}'`);
            return name;
        });
    }

    public async getPetDob (test: unknown): Promise<string> {
        return this.logStep(`Get pet D.O.B`, test, async () => {
            await this.waitForElementVisible('petDob', timeout.SHORT);

            const dob = await this.getElement('petDob').getText();
            this.log(`Got pet DOB '${dob}'`);
            return dob;
        });
    }

    public async getPetType (test: unknown): Promise<string> {
        return this.logStep(`Get pet type`, test, async () => {
            await this.waitForElementVisible('petType', timeout.SHORT);

            const type = await this.getElement('petType').getText();
            this.log(`Got pet type '${type}'`);
            return type;
        })
    }

    public async getPetDetails (test: unknown): Promise<Pet> {
        return this.logStep(`Get pet details`,  test, async () => {
            const name = await this.getPetName(test);
            const dob = await this.getPetDob(test);
            const type = await this.getPetType(test);

            return new Pet(name, dob, type);
        });
    }
}

export const ownersPage = new OwnersPage();
