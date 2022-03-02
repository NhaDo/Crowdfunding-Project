import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0x6D7a6F07EbFE93c4ea56300DbAE9EdEc78560427',
)

export default instance;