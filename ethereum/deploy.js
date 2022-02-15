const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('../ethereum/build/CampaignFactory.json');

const provider = new HDWalletProvider(
    // insert mnemonic
    'tackle oak uncover party ridge chat upon year bike morning coconut sadness',
    'https://rinkeby.infura.io/v3/a50ee7a35016433b9a8e224bb073dd7a',
)

const web3 = new Web3(provider);

const deploy = async ()=>{
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account ', accounts);
    const result = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({
            data: '0x' + compiledFactory.evm.bytecode.object, 
        }) // add 0x bytecode
        .send({from: accounts[0]}); // remove 'gas'
    
    // print contract address
    console.log('Contract deployed to ', result.options.address);
}
deploy();