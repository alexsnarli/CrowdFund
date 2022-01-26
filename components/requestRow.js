import React, { Component } from "react";
import { Table, Form, Message, Button } from "semantic-ui-react";
import Link from "next/link";
import web3 from "../ethereum/web3";

class RequestRow extends Component {
  state = {
    loading: false,
    errMessage: "",
  };

  onApprove = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(this.props.address);

      await campaign.methods.approveRequest(this.props.id).send({
        from: accounts[0],
      });

      Router.push(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, request } = this.props;
    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>
          {request.approvalCount} / {this.props.approversCount}
        </Cell>
        <Cell>
          <Form onSubmit={this.onApprove(id)} error={!!this.state.errMessage}>
            <Message error header="Oops!" content={this.state.errMessage} />
            <Button loading={this.state.loading} color="green" type="submit">
              Approve request
            </Button>
          </Form>
        </Cell>

        <Cell>
          <Form onSubmit={this.onFinalize} error={!!this.state.errMessage}>
            <Message error header="Oops!" content={this.state.errMessage} />
            <Button loading={this.state.loading} color="red" type="submit">
              Finalize request
            </Button>
          </Form>
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
