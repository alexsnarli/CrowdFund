import React, { Component } from "react";
import Layout from "../../../../components/layout";
import Link from "next/link";
import { Button, Table } from "semantic-ui-react";
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import RequestRow from "../../../../components/requestRow";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;

    const campaign = Campaign(address);
    const requestCount = parseInt(
      await campaign.methods.getRequestsCount().call()
    );
    const approversCount = parseInt(
      await campaign.methods.numContributors().call()
    );

    const requests = await Promise.all(
      Array(requestCount)
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );

    return { address, requests, requestCount, approversCount };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          approvers={this.props.approversCount}
          key={index}
          id={index}
          request={request}
          address={this.props.address}
        />
      );
    });
  }

  render() {
    const { Header, Body, Row, HeaderCell } = Table;

    return (
      <Layout>
        <Link href={`/campaigns/${this.props.address}/`}>
          <Button floated="right">Back to campaign</Button>
        </Link>
        <Link href={`/campaigns/${this.props.address}/requests/newRequest`}>
          <Button floated="right" primary>
            Create Request
          </Button>
        </Link>
        <h2> Requests </h2>
        <Table celled padded>
          <Header>
            <Row>
              <HeaderCell>id</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Vote Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div> Found {this.props.requestCount} requests. </div>
      </Layout>
    );
  }
}

export default RequestIndex;
