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

    public async getSpecialitiesCount (vet, context: unknown): Promise<number> {
        let count = 0;

        await this.logStep('Get specialties count', context, async () => {
          await this.waitForElementVisible('vetsTable', timeout.MEDIUM);

          const specialities = await this.getElements('specialitiesList');
          for(const specialty of specialities){

              // Perform case insensitive comparisson
              if(vet.speciality.localeCompare(await specialty.getText(),
                  undefined, { sensitivity: 'base' }) === 0){
                  count++;
              }
          }

          await this.log(`Got specialties count of '${count}'`);
        });
        return count;
    }

    public async getVetsCount (context: unknown): Promise<number> {
        await this.waitForElementVisible('vetsTable', timeout.SHORT);
        const vetsList = await this.getElements('vetsList');

        const vetCount = vetsList.length;
        await this.logStep(`Got vet count of '${vetCount}'`, context);
        return vetCount;
    }

    public async deleteVet (vet, context: unknown): Promise<void>  {
        await this.logStep(`Delete a vet '${vet.firstName} ${vet.lastName}'`, context, async () => {

            await this.waitForElementVisible('vetsTable', timeout.SHORT);
            const vetsList = await this.getElements('vetsList');
            const delBtns = await this.getElements('deleteButtons');

            for(let i = 0; i < vetsList.length; i++){

                if((await vetsList[i].getText()).trim() === `${vet.firstName} ${vet.lastName}`) {
                    await delBtns[i].click();
                    await this.waitForElementVisible('vetsTable', timeout.SHORT); // wait for refresh
                }
            }
        });
    }
}

export const vetsPage = new VetsPage();
