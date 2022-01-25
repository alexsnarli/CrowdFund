import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import Router from "next/router";

class ContributeForm extends Component {
  state = {
    value: "",
    errMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errMessage: "" });

    const campaign = Campaign(this.props.address);

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });
      Router.reload(`/campaigns/${this.props.address}`);
    } catch (err) {
      this.setState({ errMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errMessage}>
        <Form.Field>
          <label> Amount to contribute! </label>
          <Input
            label="ether"
            labelPosition="right"
            placeholder="input ether.."
            value={this.state.value}
            onChange={(event) => this.setState({ value: event.target.value })}
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errMessage} />

        <Button loading={this.state.loading} primary type="submit">
          Contribute!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
