// SPDX-Licence-Identifier: MIT

pragma solidity ^0.4.17;

contract CampaignFactory {

    address[] public deployedCampaigns;

    function createCampaign(uint256 _minimumContribution) public {
        address newCampaign = new Campaign(_minimumContribution, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns(address[]) {
        return deployedCampaigns;
    }
}

contract Campaign {

    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
        mapping(address => bool) approvals;
        uint256 approvalCount;
    }

    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint256 numContributors;

    function Campaign(uint256 _minimumContribution, address creator) public {
        manager = creator;
        minimumContribution = _minimumContribution;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        numContributors++;
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function createRequest(string _description, uint256 _value, address _recipient) public restricted {

        Request memory newRequest = Request({
            description: _description,
            value:_value,
            recipient:_recipient,
            complete:false,
            approvalCount:0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint256 _requestIndex) public {
        Request storage request = requests[_requestIndex];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }


    function finalizeRequest(uint256 _requestIndex) public restricted {
        Request storage request = requests[_requestIndex];

        require(!request.complete);
        require(request.approvalCount > (numContributors/2));

        request.recipient.transfer(request.value);

        request.complete == true;
    }

    function getSummary() public view returns (uint256, uint256, uint256, uint256, address) {
        return(
            minimumContribution, // minimum contribution
            this.balance, // balance of contract
            requests.length, // number of pending requests
            numContributors, // number of contributors
            manager //return manager address
        );
    }

    function getRequestsCount() public view returns (uint256) {
        return requests.length;
    }
}
