import React, { Component } from "react";
import Layout from "../../../components/layout";
import web3 from "../../../ethereum/web3";
import Campaign from "../../../ethereum/campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import ContributeForm from "../../../components/contributeForm";
import Link from "next/link";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestCount,
      approversCount,
    } = this.props;

    const items = [
      {
        header: web3.utils.fromWei(balance, "ether"),
        description:
          "Total balance of this contract. These funds can be used to fund the project.",
        meta: "Balance (ether)",
      },
      {
        header: approversCount,
        description:
          "Number of people who have contributed to the project, and act as approvers.",
        meta: "Contributors",
      },
      {
        header: minimumContribution,
        description:
          "Minimum contribution to become a contributor and approver of this project. By contributing, you can approve requests.",
        meta: "Minimum contribution (wei)",
      },
      {
        header: requestCount,
        description:
          "A requests tries to withdraw money from the contract. Has to be approved by over 50% of the approvers.",
        meta: "Number of requests",
      },
      {
        header: manager,
        description:
          "The manager created this campaign, and can create requests to withdraw funds from the contract",
        meta: "Address of manager.",
        style: { overflowWrap: "break-word" },
      },
    ];
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h1> Campaign details </h1>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link href={`${this.props.address}/requests/`}>
                <Button primary> Manage Requests </Button>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
