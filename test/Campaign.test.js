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

    it('marks caller as the campaign manager', async()=>{
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    })

    it('allows people to contribute money and marks them as approvers', async() =>{
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: 200,            
        });

        let isApprover = await campaign.methods.approvers(accounts[1]).call();
        assert(isApprover);
    })
    
    it('requires a minimum contribution', async() =>{
        try{
            await campaign.methods.contribute().call({
                from: accounts[1],
                value: 5,
            })
            assert(false);
        }
        catch(err){
            assert(err);
        }
    })

    it('allows the manager to make a payment request', async()=> {
        await campaign.methods.createRequest(
            'just a booty call', // description
            web3.utils.toWei('1', 'ether'), // value
            accounts[2] // recipient
        ).send({
            from: accounts[0],
            gas: '1000000'
        })

        const request = await campaign.methods.requests(0).call();
        assert.equal('just a booty call', request.description);
    })

    it('processes requests', async()=>{
        //contribute 10eth
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        })

        //create request to send 1eth to accounts[1]
        await campaign.methods
            .createRequest('nothing matters', web3.utils.toWei('5','ether'), accounts[1])
            .send({
                from: accounts[0],
                gas: 2000000
            })

        //vote approve request
        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: 1000000
        })

        //finalizeRequest and send 1eth to the recipient
        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: 1000000
        })
        
        //check balance of the recipient >0
        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);
        console.log(balance);
        assert(balance > 104);
    })
})