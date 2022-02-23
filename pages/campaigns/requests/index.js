import React, {Component} from 'react'
import Layout from '../../../components/layout'
import {Button, Icon, Table} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {Link} from '../../../routes'
import Campaign from '../../../ethereum/campaign'
import RequestRow from '../../../components/requestRow'

class RequestIndex extends Component{
    static async getInitialProps(props){
        const {address} = props.query;
        const campaign = Campaign(address);

        const requestCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index)=>{
                return campaign.methods.requests(index).call();
            })
        )
        //console.log(requests);

        return {address, requests, requestCount, approversCount, campaign}
    }

    renderRows(){
        return this.props.requests.map((request, index)=>{
            return <RequestRow
            key={index}
            id={index} // name this prop like this so we dont get confused later
            approversCount = {this.props.approversCount}
            request = {request}
            campaign = {this.props.campaign}
            address= {this.props.address}/>;
        })
    }
    render(){
        const {Header, Row, HeaderCell, Body} = Table;
        return(
            <Layout>
                <Link route={`/campaigns/${this.props.address}`}>
                    <Button icon='arrow left' basic></Button>
                </Link>
                <h3>List of campaign requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <Button primary animated>
                        <Button.Content visible>Add request</Button.Content>
                        <Button.Content hidden>
                            <Icon name='add'/>
                        </Button.Content>
                    </Button>
                </Link>
                <Table celled basic>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount (ETH)</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>{this.renderRows()}</Body>
                </Table>
            </Layout>
        );
    }
}
export default RequestIndex;