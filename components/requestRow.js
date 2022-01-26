import React, { Component } from "react";
import { Table, Form, Message, Button } from "semantic-ui-react";
import Link from "next/link";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import Router from "next/router";

class RequestRow extends Component {
  state = {
    loadingApprove: false,
    loadingFinalize: false,
    errMessage: "",
  };

  onApprove = async () => {
    this.setState({ loadingApprove: true });

    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();

    await campaign.methods
      .approveRequest(this.props.id)
      .send({ from: accounts[0] });

    this.setState({ loadingApprove: false });
    Router.reload(`/campaigns/${this.props.address}/requests`);
  };

  onFinalize = async () => {
    this.setState({ loadingFinalize: true });
    const campaign = Campaign(this.props.address);
    const accounts = await web3.eth.getAccounts();

    await campaign.methods
      .finalizeRequest(this.props.id)
      .send({ from: accounts[0] });

    this.setState({ loadingFinalize: false });
    Router.reload(`/campaigns/${this.props.address}/requests`);
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request, approvers } = this.props;
    const readyToFinalize = request.approvalCount >= approvers / 2;

    return (
      <Row
        disabled={request.complete}
        positive={readyToFinalize && !request.complete}
      >
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount} / {approvers}
        </Cell>
        <Cell>
          {request.complete ? (
            "Request complete"
          ) : (
            <Button
              loading={this.state.loadingApprove}
              color="green"
              basic
              onClick={this.onApprove}
            >
              Approve request
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : readyToFinalize ? (
            <Button
              loading={this.state.loadingFinalize}
              color="teal"
              basic
              onClick={this.onFinalize}
            >
              Finalize request
            </Button>
          ) : null}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
