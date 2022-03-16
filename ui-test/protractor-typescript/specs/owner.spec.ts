import data from '../../data/testData';
import mainMenu from '../pages/mainMenu';
import { ownersAddPage } from '../pages/ownersAddPage';
import { ownersPage } from '../pages/ownersPage';
import { reporting } from 'qcoe-fedex-ui-test-common';

const expect = global['chai'].expect;

//create a suite
describe('Pet Clinic owner tests', function(){

  afterEach(async function() {
    if (this.currentTest.state === 'failed') {
      await reporting.reportFailure(this, this.currentTest)
    }
  });

  //create a test
  it('Confirm pet details for Peter McTavish', async function () {
      await mainMenu.navigateOwnersAll(this);

      await ownersPage.selectOwner(this, data.owner);
      const pet = await ownersPage.getPetDetails(this);

      expect(pet.name, 'Pet name mismatch').to.be.equal(data.pet.name);
      expect(pet.dob, 'Pet DOB mismatch').to.be.equal(data.pet.dob);
      expect(pet.type, 'Pet type mismatch').to.be.equal(data.pet.type);
  })


  it("Add owner test", async function (){
      await mainMenu.navigateOwnersAdd(this);

      await ownersAddPage.addOwner(this, data.newOwner);

      await mainMenu.navigateOwnersAll(this);

      const owner = await ownersPage.getOwnerDetails(this, data.newOwner);

      expect(owner.name, 'Ower name').to.be.equal(`${data.newOwner.firstName} ${data.newOwner.lastName}`);
      expect(owner.address, 'Owner address').to.be.equal(data.newOwner.address);
      expect(owner.city, 'Owner city').to.be.equal(data.newOwner.city);
      expect(owner.telephone, 'Owner telephone').to.be.equal(data.newOwner.telephone);
  });
});
