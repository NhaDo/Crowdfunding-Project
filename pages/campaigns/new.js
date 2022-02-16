import React,{ Component } from 'react';
import Layout from  '../../components/layout';
import 'semantic-ui-css/semantic.min.css';
import {Form, Button, Input} from 'semantic-ui-react';

class CampaignNew extends Component{
    render(){
        return <Layout>
        <div style={{marginLeft: '300px', marginRight:'300px'}}>
            <h3>Create a campaign</h3>
            <Form>
                <Form.Field>
                    <label>Minumum Contribution</label>
                    <Input label='Wei' labelPosition='right'></Input>
                </Form.Field>
                <Button primary type='submit'>Create</Button>
            </Form>
        </div>
        </Layout>
    }
}

export default CampaignNew;