import react from 'react';
import { Component } from 'react/cjs/react.production.min';
import factory from '../ethereum/factory'

class CampaignIndex extends Component{
    static async getInitialProps(){
        let campaigns = await factory.methods.getDeployedCampaigns().call();
        return{ campaigns: campaigns };        
    }

    render(){
        console.log(this.props.campaigns);
        return <div>{this.props.campaigns}</div>
    }
}

export default CampaignIndex;