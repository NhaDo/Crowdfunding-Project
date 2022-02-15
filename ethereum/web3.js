import Web3 from 'web3';
import react from 'react';
import React, { useEffect } from "react";


let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'){
    // we are in the browser and metamask is running
    web3 = new Web3(window.ethereum);
} else {
    // we are on the server or the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/a50ee7a35016433b9a8e224bb073dd7a'
    );
    web3 = new Web3(provider);
}

export default web3;