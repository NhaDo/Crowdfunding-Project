import React, {Component} from 'react'
import Layout from '../../components/layout'
import 'semantic-ui-css/semantic.min.css'
import Campaign from '../../ethereum/campaign'
import {Card, Grid, Button} from 'semantic-ui-react'
import web3 from '../../ethereum/web3'
import ContributeForm from '../../components/contributeForm'
import { Link } from '../../routes'
class CampaignShow extends Component{
    static async getInitialProps(props){
        //console.log(props.query.address);
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        console.log(summary);
        return{ 
            address: props.query.address,
            minimumContribution: summary[0],
            balance:summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
            campaignName: summary[5],
            creatorName: summary[6]
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount,
            campaignName,
            creatorName
        } = this.props;

        const items = [
              {
                header: 'Campaign title',
                description:
                  'The campaign name.',
                style: {overflowWrap: 'break-word'},
                color: 'blue',
                extra: campaignName,
              },
              {
                header: 'Campaign creator',
                description:
                  'The company/individual created this campaign.',
                style: {overflowWrap: 'break-word'},
                color: 'blue',
                extra: creatorName,
              },
              {
                header: 'Address of manager',
                description:
                  'The manager created this campaign and can create requests to withdraw money.',
                style: {overflowWrap: 'break-word'},
                extra: manager,
              },
              {
                header: 'Minimum contribution (Wei)',
                description:
                  'The minimum amount of Wei you must contribute to become an approver.',
                style: {overflowWrap: 'break-word'},
                color: 'blue',
                extra: minimumContribution + ' Wei',
              },
              {
                header: 'Number of requests',
                description:
                  'Manager creates requests to withdraw money from the contract.'
                  + ' Approvers vote to approve the requests.',
                style: {overflowWrap: 'break-word'},
                color: 'blue',
                extra: requestsCount,
                href: `/campaigns/${this.props.address}/requests`
              },
              {
                header: 'Number of approvers',
                description:
                    'Number of people who have already donated to this campaign.',
                style: {overflowWrap: 'break-word'},
                color: 'blue',
                extra: approversCount, 
                href: `/campaigns/${this.props.address}/approvers`           
              },
              {
                header: 'Campaign balance (ETH)',
                description:
                  'The balance is how much money the campaign have left to spend.',
                style: {overflowWrap: 'break-word'},
                color: 'blue',
                extra: web3.utils.fromWei(balance, 'ether') + ' ETH',
              },
        ]
        return <Card.Group items={items}/>
    }
    render(){
        
        return ( 
        <Layout>
            <Link route={`/`}>
              <Button icon='arrow left' basic></Button>
            </Link>
            <h3>Campaigns Details</h3>
            <Grid>
              <Grid.Column width={10}>
                {this.renderCards()}
              </Grid.Column>              
              <Grid.Column width={6}>
                <ContributeForm address={this.props.address}/>
              </Grid.Column>              
            </Grid>
        </Layout>
        )
        
    }
}

export default CampaignShow