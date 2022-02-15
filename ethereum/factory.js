import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0xBD49fb22389D797De31d410cE0d26eba6F7f6002',
)

export default instance;