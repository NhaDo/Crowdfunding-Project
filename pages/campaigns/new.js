import React,{ Component } from 'react';
import Layout from  '../../components/layout';
import 'semantic-ui-css/semantic.min.css';
import {Form, Button, Input, Message, FormField} from 'semantic-ui-react';
import factory from '../../ethereum/factory'
import web3 from '../../ethereum/web3'
import {Router, Link} from '../../routes'
class CampaignNew extends Component{
    state = {
        campaignName: '',
        creatorName: '',
        minimumContribution: '',
        errorMessage: '',
        loading: false,
        success: false
    }

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading: true, errorMessage:''});
        try{
            await window.ethereum.enable();//need this to load accounts
            const accounts = await web3.eth.requestAccounts();
            const {minimumContribution, campaignName, creatorName} = this.state;

            await factory.methods.createCampaign(
                minimumContribution,
                campaignName,
                creatorName).send({
                from: accounts[0],
            });
            
            //success message!
            this.setState({success: true});
            //back to index page after 2s, let viewer see the success prompt a bit
            setTimeout(() => { Router.pushRoute('/')}, 1000);
           

        } catch (err) {
            this.setState({errorMessage: err.message})
        }
        this.setState({loading: false, value: ''})
    }

    render(){
        return <Layout>
        <div style={{marginLeft: '200px', marginRight:'200px'}}>
            <h3>Create a campaign</h3>
            <Form onSubmit={this.onSubmit} 
                error={!!this.state.errorMessage}
                success={this.state.success}>
                
                <Form.Field>
                    <label>Campaign Title</label>
                    <Input 
                        value={this.state.campaignName}
                        onChange={event => 
                            this.setState({campaignName: event.target.value})}
                    />
                </Form.Field>
                <FormField>
                    <label>Creator Name</label>
                    <Input
                        value={this.state.creatorName}
                        onChange={event => 
                            this.setState({creatorName: event.target.value})}
                    />
                </FormField>
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
                    header='Oops (◞‸◟) !' 
                    content={this.state.errorMessage}
                />
                <Message success
                    header='Transaction success ヽ(*⌒∇⌒*)ﾉ !'
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