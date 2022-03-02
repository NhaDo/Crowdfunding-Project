// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract CampaignFactory{
    address[] public deployedCampaigns;
    function createCampaign(uint minimum, 
        string memory _campaignName, string memory _creatorName) public {
        Campaign newCampaign = 
            new Campaign(minimum, msg.sender, _campaignName, _creatorName);
        deployedCampaigns.push(address(newCampaign));
    }

    function getDeployedCampaigns() public view returns(address[] memory){
        return deployedCampaigns;
    }
}

contract Campaign{
    struct Request{
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping (address=>bool) approvals;  
    }
    address public manager;
    uint public minimumContribution;
    mapping (address=>bool) public approvers;
    uint numRequests = 0;
    mapping (uint => Request) public requests;
    uint public approversCount;
    string public campaignName;
    string public creatorName;


    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    modifier approved(){
        require(approvers[msg.sender]);
        _;
    }
    constructor(uint minimum, 
        address creator, 
        string memory _campaignName, 
        string memory _creatorName){
        manager = creator;
        minimumContribution = minimum;
        campaignName = _campaignName;
        creatorName = _creatorName;
    }

    function contribute() public payable{
        require(msg.value > minimumContribution);
        if (!approvers[payable(msg.sender)]) {
            approvers[payable(msg.sender)] = true;
            approversCount++;
        }
    }

    function createRequest(string memory _description, uint _value, address payable _recipient) 
    public restricted{
        Request storage r = requests[numRequests++];
        r.description = _description;
        r.value = _value;
        r.recipient = _recipient;
        r.complete = false;
        r.approvalCount = 0;    
    }
    function approveRequest(uint _index) public approved{
        Request storage request = requests[_index];

        //dont check the address is in approvers because
        //here i created an "approved" modifier
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    function finalizeRequest(uint _index) public restricted{
        Request storage request = requests[_index];
        require(!request.complete);
        require(request.approvalCount > (approversCount / 2));

        request.recipient.transfer(request.value);
        request.complete = true;
    }
    function getSummary() public view returns (
        uint,
        uint,
        uint,
        uint,
        address,
        string memory,
        string memory
    ){
        return(
            minimumContribution,
            address(this).balance,
            numRequests,
            approversCount,
            manager,
            campaignName,
            creatorName
        );
    }
    
    function getRequestsCount() public view returns (uint){
        return(numRequests);
    }
}