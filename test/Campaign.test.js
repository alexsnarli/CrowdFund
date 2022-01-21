const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: "1000000" });

  await factory.methods.createCampaign("100").send({
    from: accounts[0],
    gas: "1000000",
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe("Campaigns", () => {
  it("Deploys factory and a campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it("Makes caller of createCampaign manager", async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it("Donator becomes approver", async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: "200",
    });
    const checkApprover = await campaign.methods.approvers(accounts[0]).call();
    const checkNonApprover = await campaign.methods
      .approvers(accounts[1])
      .call();
    assert(checkApprover);
    assert(!checkNonApprover);
  });

  it("Has a minimum contribution", async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: "50",
      });
    } catch (err) {
      assert(err);
      return;
    }
    assert(false);
  });

  it("Allows a manager to make a payment request", async () => {
    await campaign.methods
      .createRequest("Test transaction", "100", accounts[1])
      .send({ from: accounts[0], gas: "1000000" });

    const request = await campaign.methods.requests(0).call();

    assert.equal("Test transaction", request.description);
  });

  it("Processes requests", async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: web3.utils.toWei("10", "ether"),
    });
    await campaign.methods.contribute().send({
      from: accounts[2],
      value: web3.utils.toWei("10", "ether"),
    });

    await campaign.methods
      .createRequest(
        "Test transaction",
        web3.utils.toWei("20", "ether"),
        accounts[1]
      )
      .send({ from: accounts[0], gas: "1000000" });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: 1000000,
    });
    await campaign.methods.approveRequest(0).send({
      from: accounts[1],
      gas: 1000000,
    });
    await campaign.methods.approveRequest(0).send({
      from: accounts[2],
      gas: 1000000,
    });

    let balanceBefore = await web3.eth.getBalance(accounts[1]);
    balanceBefore = web3.utils.fromWei(balanceBefore, "ether");
    balanceBefore = parseFloat(balanceBefore);

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: 1000000,
    });

    let balanceAfter = await web3.eth.getBalance(accounts[1]);
    balanceAfter = web3.utils.fromWei(balanceAfter, "ether");
    balanceAfter = parseFloat(balanceAfter);

    assert(balanceAfter > balanceBefore + 19);
  });
});
