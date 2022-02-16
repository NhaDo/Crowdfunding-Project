import React, {Component} from 'react';
import {Menu, Button} from 'semantic-ui-react';

export default()=>{
    return(
        <Menu style={{ marginTop:'20px'}}>
            <Menu.Item><b color='teal'>CrowdCoins</b></Menu.Item>

            <Menu.Menu position='right'>
                <Menu.Item>Campaigns</Menu.Item>
                <Menu.Item><Button icon="add" color='teal'/></Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}