import { reporting } from "qcoe-fedex-ui-test-common";
import data from '../../data/testData';
import mainMenu from '../pages/mainMenu';
import ownersAddPage from '../pages/ownersAddPage';
import ownersPage from '../pages/ownersPage';
import assertion from 'soft-assert/index'

const expect = global['chai'].expect;

//create a suite
describe('Pet Clinic owner tests', function(){
  afterEach(async function() {
    if (this.currentTest.state === 'failed') {
      await reporting.reportFailure(this, this.currentTest)
    }
  });

  it('Confirm pet details for Peter McTavish @acceptance', async function () {
    await mainMenu.navigateOwnersAll(this);

    await ownersPage.selectOwner(this, data.owner);

    let pet = await ownersPage.getPetDetails();

    expect(pet.name, 'Pet name mismatch').to.be.equal(data.pet.name);
    expect(pet.dob, 'Pet DOB mismatch').to.be.equal(data.pet.dob);
    expect(pet.type, 'Pet type mismatch').to.be.equal(data.pet.type);
  })

  it("Add owner test @acceptance", async function () {
    await mainMenu.navigateOwnersAdd(this);

    await ownersAddPage.addOwner(this, data.newOwner);

    await mainMenu.navigateOwnersAll(this);
    let owner = await ownersPage.getOwnerDetails(this, data.newOwner);

    assertion.softAssert(owner.name, `${data.newOwner.firstName} ${data.newOwner.lastName}`, 'Ower name')
    assertion.softAssert(owner.address, data.newOwner.address, 'Owner address');
    assertion.softAssert(owner.city, data.newOwner.city, 'Owner city');
    assertion.softAssert(owner.telephone, data.newOwner.telephone, 'Owner telephone');
    assertion.softAssertAll();
  });
});
