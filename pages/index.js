import react from 'react';
import factory from '../ethereum/factory'

class CampaignIndex extends Component{
    async componentDidMount(){
        const campaigns = await factory.methods.deployedCampaigns().call();
        console.log(campaigns);
    }
    render(){
        return <div>Campaign index!</div>
    }
}

export default CampaignIndex;