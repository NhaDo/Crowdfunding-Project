import React, {Component} from 'react'
import {Table, Button, Icon } from 'semantic-ui-react'
import web3 from '../ethereum/web3'
import { Router } from '../routes'

class RequestRow extends Component{
    onApprove = async () => {
        const {campaign} = this.props;

        await window.ethereum.enable();
        const accounts = await web3.eth.requestAccounts();
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        })

        Router.replaceRoute(
            `/campaigns/${this.props.address}/requests`)

    }
    onFinalize = async () =>{
        const {campaign} = this.props;

        await window.ethereum.enable();
        const accounts = await web3.eth.requestAccounts();
        
        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        })

        Router.replaceRoute(
            `/campaigns/${this.props.address}/requests`)
    }
    render()
    {
        const {Row, Cell} = Table;
        const {id, request, approversCount} = this.props; // id = this.props.id, etc.
        const readyToFinalize = request.approvalCount>(approversCount/2);

        return <Row positive={request.complete}>
            <Cell>{id}</Cell>
            <Cell>{request.description}</Cell>
            <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
            <Cell collapsing>{request.recipient}</Cell>
            <Cell>{request.approvalCount}/{approversCount}</Cell>
            <Cell>
            {request.complete ? null : (
                <Button basic 
                positive 
                icon='thumbs up'
                content='Approve'
                onClick={this.onApprove}/>
            )}
            </Cell>
            <Cell textAlign='center'>
            {request.complete ? (<Icon name='check' color='green'/>) : (
                <Button basic disabled={!readyToFinalize}
                icon='sign in' 
                content='Finalize'
                color='blue'
                onClick={this.onFinalize}/>
            )}
            </Cell>
        </Row>
    }
}

export default RequestRow;