import React,{ Component } from 'react';
import Layout from  '../../components/layout';
import 'semantic-ui-css/semantic.min.css';
import {Form, Button, Input, Message} from 'semantic-ui-react';
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'

class CampaignNew extends Component{
    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading: true, errorMessage:''});
        try{
            await window.ethereum.enable();//need this to load accounts
            const accounts = await web3.eth.requestAccounts();

            await factory.methods.createCampaign(this.state.minimumContribution).send({
                from: accounts[0],
            });
        } catch (err) {
            this.setState({errorMessage: err.message})
        }
        this.setState({loading: false})
    }

    render(){
        return <Layout>
        <div style={{marginLeft: '200px', marginRight:'200px'}}>
            <h3>Create a campaign</h3>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Minumum Contribution</label>
                    <Input label='Wei'
                        labelPosition='right'
                        value={this.state.minimumContribution}
                        onChange={event => 
                            this.setState({minimumContribution:event.target.value})}
                    />
                </Form.Field>
                <Message error
                    header='Oops（◞‸◟）!' 
                    content={this.state.errorMessage}
                />
                <Button primary 
                    loading={this.state.loading}
                    type='submit'>Create</Button>
            </Form>
        </div>
        </Layout>
    }
}

export default CampaignNew;