import React, {Component} from 'react'
import {Form, Input, Message, Button} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import web3 from '../ethereum/web3'
import Campaign from '../ethereum/campaign'
import {Router} from '../routes'

class ContributeForm extends Component{
    state = {
        value: '',
        loading: false,
        success: false,
        errorMessage: ''    
    };

    onSubmit = async (event) =>{
        event.preventDefault();
        this.setState({loading: true, errorMessage: '', success: false})
        const campaign = Campaign(this.props.address);
        try{
            await window.ethereum.enable();
            const accounts = await web3.eth.requestAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            })

            this.setState({success: true});

            //refresh the page
            Router.replaceRoute(
                `/campaigns/${this.props.address}`)

        } catch (err) {
            this.setState({errorMessage: err.message})
        }
        this.setState({loading: false})
    }
    render(){
        return(
            <Form onSubmit={this.onSubmit} 
                success={this.state.success}
                error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to contribute</label>
                    <Input
                        value = {this.state.value}
                        onChange = {event => this.setState({value: event.target.value})}
                        label='ETH'
                        labelPosition='right'
                    />
                </Form.Field>
                <Button primary loading={this.state.loading}>Contribute</Button>
                <Message success
                    header='Transaction success ヽ(*⌒∇⌒*)ﾉ !'
                    content='Thank you for contributing.'
                />
                <Message error
                    header='Oops (◞‸◟) !'
                    content={this.state.errorMessage}
                />
            </Form>
        )
    }
}

export default ContributeForm;