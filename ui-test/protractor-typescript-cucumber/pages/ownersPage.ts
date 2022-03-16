import { FedexBasePage, timeout } from 'qcoe-fedex-ui-test-common';

import Pet from "../model/pet";
import Owner from "../model/owner";

const route = 'owners';
const selector = {
    ownersTable : {css: '.table.table-striped'},
    ownerNameList : {css: '.table-responsive td a'},
    petName : {css: '.table.table-striped .dl-horizontal dd:nth-child(2)'},
    petDob : {css: '.table.table-striped .dl-horizontal dd:nth-child(4)'},
    petType : {css: '.table.table-striped .dl-horizontal dd:nth-child(6)'}
}

class OwnersPage extends FedexBasePage {

    constructor() {
        super(selector, route);
    }

    public async getOwnerDetails(owner, context?: unknown): Promise<any> {

        return this.logStep('Get owner details', context, async () => {
            let name = "";
            let address = "";
            let city = "";
            let telephone = "";

            await this.waitForElementVisible('ownersTable', timeout.SHORT);
            const nameList  = await this.getElements('ownerNameList');

            for (let index = 0; index < nameList.length; index += 1) {
                name = await nameList[index].getText();

                if(name === `${owner.firstName} ${owner.lastName}`){
                    address = await this.getTableColumnText('ownersTable', index+1, 'Address')

                    city = await this.getTableColumnText('ownersTable', index+1, 'City')

                    telephone = await this.getTableColumnText('ownersTable', index+1, 'Telephone')
                    break;
                }
            }

            await this.logStep(`Got owner details: '${name}, ${address}, ${city}, ${telephone}'`, context)
            return new Owner(name, address, city, telephone);
        });
    }

    public async selectOwner (owner, context: unknown) {
        return this.logStep(`Select owner ${owner.name}`, context, async () => {

          await this.waitForElementVisible('ownersTable', timeout.SHORT);

          const nameList = await this.getElements('ownerNameList');
          for (const name of nameList) {
              const nameText = await name.getText();
              if(nameText === `${owner.name}`){
                  await name.click();
                  break;
              }
          }
        });
    }

    public async getPetName (context?: unknown): Promise<string> {
        await this.waitForElementVisible('petName', timeout.SHORT);
        const name = await this.getElements('petName').getText();
        await this.logStep(`Got pet name '${name}'`, context);
        return name.toString();
    }

    public async getPetDob (context?: unknown): Promise<string> {
        await this.waitForElementVisible('petDob', timeout.SHORT);

        const dob = await this.getElement('petDob').getText();
        await this.logStep(`Got pet DOB '${dob}'`, context);
        return dob.toString();
    }

    public async getPetType (context?: unknown): Promise<string> {
        await this.waitForElementVisible('petType', timeout.SHORT);

        const type = await this.getElement('petType').getText();
        await this.logStep(`Got pet type '${type}'`, context);
        return type.toString();
    }

    public async getPetDetails (context: unknown): Promise<Pet> {

        const name = await this.getPetName(context);
        const dob = await this.getPetDob(context);
        const type = await this.getPetType(context);

        return new Pet(name, dob, type);
    }
}

export const ownersPage = new OwnersPage();
