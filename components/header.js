import React, {Component} from 'react';
import {Menu, Button} from 'semantic-ui-react';
import {Link} from '../routes';

export default()=>{
    return(
        <Menu style={{ marginTop:'20px'}}>
            <Link route='/'><a className='item'>CrowdCoin</a></Link>
            <Menu.Menu position='right'>
                <Link route='/'><a className='item'>Campaigns</a></Link>
                <Link route='/campaigns/new'><a className='item'>
                    <Button icon="add" primary/></a></Link>
            </Menu.Menu>
        </Menu>
    )
}