import React, {Component} from 'react'
import Layout from '../../../components/layout'
import {Form, Button, Message, Input} from 'semantic-ui-react'
import Campaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import {Link, Router} from '../../../routes' 
import 'semantic-ui-css/semantic.min.css'

class RequestNew extends Component{
    state = {
        value: '',
        description: '',
        recipient: '',
        errorMessage: '',
        loading: false,
        success: false
    }

    onSubmit = async (event) => {
        this.setState({loading: true, success: false, errorMessage:''})
        event.preventDefault();
        const campaign = Campaign(this.props.address);
        const { description, value, recipient} = this.state;
        try {
            await window.ethereum.enable();//need this to load accounts
            const accounts = await web3.eth.requestAccounts();
            await campaign.methods.createRequest(
                description,
                web3.utils.toWei(value, 'ether'),
                recipient
            ).send({
                from: accounts[0],
            });

            this.setState({success: true});

        } catch (err){
            this.setState({errorMessage: err.message})
        }
        this.setState({loading: false})
    }

    static async getInitialProps(props){
        const {address} = props.query;
        return {address: address};
    }
    render(){
        return(
            <Layout>
            <div style={{marginLeft: '200px', marginRight:'200px'}}>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <Button icon='arrow left' basic></Button>
                </Link>
                <h3>Create a request</h3>
                <Form onSubmit={this.onSubmit}
                    success={this.state.success}
                    error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input value={this.state.description}
                            onChange={event =>
                                this.setState({description: event.target.value})}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Value (ETH)</label>
                        <Input 
                            label='ETH' 
                            labelPosition='right'
                            value={this.state.value}
                            onChange={event =>
                                this.setState({value: event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient Address</label>
                        <Input value={this.state.recipient}
                            onChange={event =>
                            this.setState({recipient: event.target.value})}/>
                    </Form.Field>
                    <Button 
                        type='submit'
                        loading={this.state.loading}
                        primary>Create</Button>
                    <Link route={`/campaigns/${this.props.address}/requests`}>
                        <Button
                            floated='right' 
                            type='button'
                            content='View all requests'
                            icon='right arrow'
                            labelPosition='right'
                            basic
                            primary
                            />
                    </Link>
                    <Message success header='Transaction success ヽ(*⌒∇⌒*)ﾉ !'/>
                    <Message error
                    header='Oops (◞‸◟) !' 
                    content={this.state.errorMessage}
                    />             
                </Form>
            </div>
            </Layout>
        )
    }
}

export default RequestNew;