
import { reporting } from "qcoe-fedex-ui-test-common";
import data from '../../data/testData';
import mainMenu from '../pages/mainMenu';
import vetsPage from '../pages/vetsPage';
import vetsAddPage from '../pages/vetsAddPage';

const expect = global['chai'].expect;

// create a suite
describe('Pet Clinic vets tests ', function(){

    afterEach(async function() {
      if (this.currentTest.state === 'failed') {
        await reporting.reportFailure(this, this.currentTest)
      }
    });

    it('Confirm number of radiology vets @acceptance', async function () {
        let radiologyCount = 0;

        await mainMenu.navigateVetsAll(this);

        radiologyCount = await vetsPage.getSpecialitiesCount(this, data.vets);

        await mainMenu.navigateVetsAdd(this);
        await vetsAddPage.addVet(this, data.vets);
        expect(await vetsPage.getSpecialitiesCount(this, data.vets), 'radiology count mismatch').to.be.equal(radiologyCount+1);
    })

    it('Delete vets test @acceptance', async function () {
        let vetsCount = 0;

        await mainMenu.navigateVetsAll(this);

        vetsCount = await vetsPage.getVetsCount(this);
        await vetsPage.deleteVet(this, data.vets);

        expect(await vetsPage.getVetsCount(this), 'Vet was not deleted').to.be.equal(vetsCount-1);
    })

    it('Example failing test', async function () {
        let vetsCount = 0;

        await mainMenu.navigateVetsAll(this);

        vetsCount = await vetsPage.getVetsCount(this);

        expect(await vetsPage.getVetsCount(this), 'Vet was not deleted').to.be.equal(vetsCount-1);
    })
});
