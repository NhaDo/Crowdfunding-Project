import { Component } from 'react/cjs/react.production.min';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory'
import 'semantic-ui-css/semantic.min.css'
import Layout from '../components/layout'

class CampaignIndex extends Component{
    static async getInitialProps(){
        let campaigns = await factory.methods.getDeployedCampaigns().call();
        return{ campaigns: campaigns };        
    }

    renderCampaigns(){
        const items = this.props.campaigns.map(address => {
            return{
                header: address,
                description: <a>View Campaign</a>,
                fluid: true
            }
        });

        return <Card.Group items={items}/>
    }

    render(){
        console.log(this.props.campaigns);
        return(
            <Layout>
                <div>
                    <h2>Open Campaigns</h2>
                    <Button content="Create Campaign" 
                            floated='right'
                            icon="add circle" //primary: color the button blue
                            primary/>
                    {this.renderCampaigns()}
                </div>
            </Layout>
        )
    }
}

export default CampaignIndex;