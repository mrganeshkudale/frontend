import { FedexBasePage, timeout } from 'qcoe-fedex-ui-test-common';

const route = 'vets';

const selectors = {
    vetsTable: {css: '.table.table-striped'},
    specialitiesList: {css: '.table.table-striped tr td div'},
    vetsNameList: {css: '.table.table-striped tr td:nth-child(1)'},
    deleteButtons: {css: '.table.table-striped tr td:nth-child(3) button:nth-child(2)'}
};

class VetsPage {

    constructor () {
      this.page = new FedexBasePage(selectors, route);
    }

    async getSpecialitiesCount (test, vet) {
        return await this.page.logStep(`Get specialties count for '${vet.firstName} ${vet.lastName}'`, test, async () => {
            let count = 0;
            await this.page.waitForElementVisible('vetsTable', timeout.SHORT);
            const specialities = await this.page.getElements('specialitiesList');
            for(let i = 0; i < specialities.length; i++){

                // Perform case insensitive comparisson
                if(vet.speciality.localeCompare(await specialities[i].getText(),
                    undefined, { sensitivity: 'base' }) === 0){
                    count++;
                }
            }

            this.page.log(`Get specialties count of '${count}'`);
            return count;
        });
    }

    async getVetsCount (test) {
        return await this.page.logStep(`Get vets count`, test, async () => {
            await this.page.waitForElementVisible('vetsTable', timeout.SHORT);
            let vetsList = await this.page.getElements('vetsNameList');

            const vetCount = vetsList.length;
            this.page.log(`Got vet count of '${vetCount}'`);
            return vetCount;
        });
    }

    async deleteVet (test, vet) {
        return await this.page.logStep(`Delete vet ${vet.firstName} ${vet.lastName}`, test, async () => {
            await this.page.waitForElementVisible('vetsTable', timeout.SHORT);
            let vetsList = await this.page.getElements('vetsNameList');
            let delBtns = await this.page.getElements('deleteButtons');
            for(let i = 0; i < vetsList.length; i++){
                if((await vetsList[i].getText()).trim() === `${vet.firstName} ${vet.lastName}`) {
                    await delBtns[i].click();
                    return true;
                }
            }
        });
    }
}

let vetsPage; export default vetsPage = new VetsPage()
