const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

// INSERT YOUR MNEMONIC HERE
const MNEMONIC = process.env.mnemonicPhrase;

// insert your infura connection point here
const INFURA_CONNECTION = process.env.infuraURL;

const provider = new HDWalletProvider(MNEMONIC, INFURA_CONNECTION);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to address ", result.options.address);
  provider.engine.stop();
};
deploy();
