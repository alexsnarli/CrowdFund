import React, { Component } from "react";
import Layout from "../../../../components/layout";
import Link from "next/link";
import { Button } from "semantic-ui-react";
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const requests = await campaign.methods.requests().call();

    return {
      address: props.query.address,
      requests,
    };
  }

  /*
  renderRequests() {
    const items = this.props.requests.map((request) => {
      return {
        header: request.description,
        description: (
          <Link href={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }*/

  render() {
    return (
      <Layout>
        <h3> Requests </h3>
        <Link href={`/campaigns/${this.props.address}/requests/newRequest`}>
          <Button primary> Create Request </Button>
        </Link>
      </Layout>
    );
  }
}

export default RequestIndex;
