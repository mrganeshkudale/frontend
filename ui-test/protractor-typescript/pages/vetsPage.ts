import { FedexBasePage, timeout } from 'qcoe-fedex-ui-test-common';

const route = 'vets';
const selectors = {
    vetsTable: {css: '.table.table-striped'},
    vetsList: {css: '.table.table-striped tr td:nth-child(1)'},
    specialitiesList: {css: '.table.table-striped tr td div'},
    vetsNameList: {css: '.table.table-striped tr td:nth-child(1)'},
    deleteButtons: {css: '.table.table-striped tr td:nth-child(3) button:nth-child(2)'}
};

class VetsPage extends FedexBasePage {

    constructor () {
        super (selectors, route);
    }

    public async getSpecialitiesCount (test: unknown, vet): Promise<number> {
        return this.logStep(`Get specialties count for '${vet.firstName} ${vet.lastName}'`, test, async () => {
            let count = 0;
            await this.waitForElementVisible('vetsTable', timeout.SHORT);
            const specialities = await this.getElements('specialitiesList');
            for(let i = 0; i < specialities.length; i++){

                // Perform case insensitive comparisson
                if(vet.speciality.localeCompare(await specialities[i].getText(),
                    undefined, { sensitivity: 'base' }) === 0){
                    count++;
                }
            }

            this.log(`Get specialties count of '${count}'`);
            return count;
        });
    }

    public async getVetsCount (test: unknown): Promise<number> {
        return this.logStep(`Get vets count`, test, async () => {
            await this.waitForElementVisible('vetsTable', timeout.SHORT);
            const vetsList = await this.getElements('vetsList');

            const vetCount = vetsList.length;
            this.log(`Got vet count of '${vetCount}'`);
            return vetCount;
        });
    }

    public async deleteVet (test: unknown, vet): Promise<void>  {
        return this.logStep(`Delete vet '${vet.firstName} ${vet.lastName}'`, test, async () => {
            await this.waitForElementVisible('vetsTable', timeout.SHORT);
            const vetsList = await this.getElements('vetsList');
            const delBtns = await this.getElements('deleteButtons');
            for(let i = 0; i < vetsList.length; i++){
                if((await vetsList[i].getText()).trim() === `${vet.firstName} ${vet.lastName}`) {
                    await delBtns[i].click();
                    return true;
                }
            }
        });
    }
}

export const vetsPage = new VetsPage();
