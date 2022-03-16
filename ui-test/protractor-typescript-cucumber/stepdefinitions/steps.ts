import { Given, When, Then } from "cucumber";
import data from "./../../data/testData";
import mainMenu from '../pages/mainMenu';
import { ownersAddPage } from '../pages/ownersAddPage';
import { ownersPage } from '../pages/ownersPage';
import { vetsPage } from '../pages/vetsPage';
import { vetsAddPage } from '../pages/vetsAddPage';
const expect = global['chai'].expect;

let radiologyCount = 0;
let vetsCount = 0;

Given ('User is on owners page', async function() {

  await mainMenu.navigateOwnersAll(this);
})

When ('User selects Peter McTavish owner', async function() {
    await ownersPage.selectOwner(data.owner, this);
})

Then ("McTavish's pets and visits info should be displayed", async function() {
    const pet = await ownersPage.getPetDetails(this);

    expect(pet.name, 'Pet name mismatch').to.be.equal(data.pet.name);
    expect(pet.dob, 'Pet DOB mismatch').to.be.equal(data.pet.dob);
    expect(pet.type, 'Pet type mismatch').to.be.equal(data.pet.type);
})

Given ('User prepared to add a Radiology veterinarian', async function() {

    await mainMenu.navigateVetsAll(this);

    radiologyCount = await vetsPage.getSpecialitiesCount(data.vets, this);
})

When ('User adds a new veterinarian with type Radiology', async function() {
    await mainMenu.navigateVetsAdd(this);

    await vetsAddPage.addVet(data.vets, this);
})

Then ('The newly added veterinarian should show up on the veterinarian page', async function() {
    expect(await vetsPage.getSpecialitiesCount(data.vets, this), 'radiology count mismatch').to.be.equal(radiologyCount+1);
})

Given ('User prepared to delete a veterinarian', async function() {
    await mainMenu.navigateVetsAll(this);

    vetsCount = await vetsPage.getVetsCount(this);
})

When ('User deletes a veterinarian', async function() {
    await vetsPage.deleteVet(data.vets, this);
})

Then ('Deleted veterinarian does not show up on the veterinarian page', async function() {
    expect(await vetsPage.getVetsCount(this), 'Vet was not deleted').to.be.equal(vetsCount-1);
})

Given ('User prepared to add a new owner', async function() {

    await mainMenu.navigateOwnersAdd(this);
})

When ('User adds new owner', async function() {
    await ownersAddPage.addOwner(data.newOwner, this);
})

Then ('the newly added owner should show up on the owners page', async function() {
    await mainMenu.navigateOwnersAll(this);

    const owner = await ownersPage.getOwnerDetails(data.newOwner, this);
    expect(owner.name, 'Ower name').to.be.equal(`${data.newOwner.firstName} ${data.newOwner.lastName}`);
    expect(owner.address, 'Owner address').to.be.equal(data.newOwner.address);
    expect(owner.city, 'Owner city').to.be.equal(data.newOwner.city);
    expect(owner.telephone, 'Owner telephone').to.be.equal(data.newOwner.telephone);
})


