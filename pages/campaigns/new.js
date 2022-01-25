import React, { Component } from "react";
import Layout from "../../components/layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import Router from "next/router";

class CampaignNew extends Component {
  state = {
    minimumContribution: "",
    errMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errMessage: "" });

    try {
      await ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0],
        });
      Router.push("/");
    } catch (err) {
      this.setState({ errMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <div>
          <h3> Create a new campaign! </h3>
          <Form onSubmit={this.onSubmit} error={!!this.state.errMessage}>
            <Form.Field>
              <label>Minimum Contribution (Wei)</label>
              <Input
                label="Wei"
                placeholder="Minimum wei..."
                labelPosition="right"
                value={this.state.minimumContribution}
                onChange={(event) =>
                  this.setState({ minimumContribution: event.target.value })
                }
              />
            </Form.Field>

            <Message error header="Oops!" content={this.state.errMessage} />

            <Button loading={this.state.loading} primary type="submit">
              Create campaign!
            </Button>
          </Form>
        </div>
      </Layout>
    );
  }
}

export default CampaignNew;
