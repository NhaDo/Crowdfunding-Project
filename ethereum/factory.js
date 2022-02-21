import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0x29E60479C4220299757e5acF81CE7a6d035A1Adf',
)

export default instance;