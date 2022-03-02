import { Component } from 'react/cjs/react.production.min';
import { Card, Button, Input } from 'semantic-ui-react';
import factory from '../ethereum/factory'
import 'semantic-ui-css/semantic.min.css'
import Layout from '../components/layout'
import {Link} from '../routes'

class CampaignIndex extends Component{
    state = {
        loading: false,
        searchValue: '',
    }

    static async getInitialProps(){
        let campaigns = await factory.methods.getDeployedCampaigns().call();
        return{ campaigns: campaigns };        
    }
    
    loadAllCampaigns(){
        const items = this.props.campaigns.map(address => {
            return{
                header: address,
                description: 
                    <Link route={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>,
                fluid: true,
            }
        });
        return items;
    }
    renderCampaigns(){
        const items = this.loadAllCampaigns();
        return <Card.Group items={items}/>
    }
    renderSearchResults(){
        const items = this.loadAllCampaigns();
        //filter results
        const results = items.filter(function(obj){
            return obj["header"].includes('4');
        })
        return <Card.Group items={results}/>
    }

    render(){
        console.log(this.props.campaigns);
        return(
            <Layout>
                <div>
                    <h2>Open Campaigns</h2>
                    <Button 
                        floated='right'
                        icon="search" //primary: color the button blue
                        basic primary
                    />
                    <Input
                        fluid
                        style={{marginBottom: '30px'}}
                        loading={this.state.loading}
                        placeholder='Search campaign ADDRESS...'  
                        value={this.state.searchValue}
                        onChange={event =>
                            this.setState({searchValue: event.target.value})}
                    />

                    <Link route='/campaigns/new'>
                        <a>
                            <Button 
                                content="Create Campaign" 
                                floated='right'
                                icon="add circle" //primary: color the button blue
                                primary
                            />
                        </a>
                    </Link>

                    {this.renderSearchResults()}
                </div>
            </Layout>
        )
    }
}

export default CampaignIndex;