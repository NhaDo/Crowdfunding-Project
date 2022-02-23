import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0xE76c2e0AD4D6d4D6Bc3A058619f38FC1B4F1D33E',
)

export default instance;