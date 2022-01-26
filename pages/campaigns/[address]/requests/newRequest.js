import React, { Component } from "react";
import Layout from "../../../../components/layout";
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import Router from "next/router";
import Link from "next/link";
import { Button, Form, Input, Message } from "semantic-ui-react";

class RequestNew extends Component {
  state = {
    description: "",
    amount: "",
    recipientAddress: "",
    errMessage: "",
    loading: false,
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(this.props.address);
      const { description, amount, recipientAddress } = this.state;

      await campaign.methods
        .createRequest(
          description,
          web3.utils.toWei(amount, "ether"),
          recipientAddress
        )
        .send({
          from: accounts[0],
        });

      Router.push(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3> Create a new request </h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errMessage}>
          <Form.Field>
            <label> Description </label>
            <Input
              label="Text"
              labelPosition="right"
              placeholder="Description..."
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label> Amount </label>
            <Input
              label="Ether"
              labelPosition="right"
              placeholder="Amount of ether..."
              value={this.state.amount}
              onChange={(event) =>
                this.setState({ amount: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label> Recipient Address </label>
            <Input
              label="Address"
              labelPosition="right"
              placeholder="Recipient address..."
              value={this.state.recipientAddress}
              onChange={(event) =>
                this.setState({ recipientAddress: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errMessage} />

          <Button loading={this.state.loading} primary type="submit">
            Create request!
          </Button>
          <Link href={`/campaigns/${this.props.address}/requests`}>
            <Button floated="right"> Back to requests </Button>
          </Link>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;
