import React, { Component } from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/layout";
import Router from "next/router";
import Link from "next/link";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link href={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3> Open Campaigns </h3>
          <Button
            content="Create Campaign"
            icon="plus"
            primary
            labelPosition="right"
            floated="right"
            href="/campaigns/new"
          />
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
