const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const fs = require("fs-extra");

const web3 = new Web3(ganache.provider())

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaign;
let campaignAddress;


beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data:  "0x" + compiledFactory.evm.bytecode.object})
        .send({ from: accounts[0], gas: '2000000' });

    await factory.methods.createCampaign('100').send({
        from: accounts[0]  ,
        gas: '1000000'
    });

    const addresses = await factory.methods.getDeployedCampaigns().call();
    campaignAddress = addresses[0];
    campaign = await new web3.eth.Contract
        (compiledCampaign.abi, campaignAddress);
})

describe('Campaigns', ()=>{
    it('deploys a factory and a campaign', ()=>{
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    })
})