import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xe72594ea761718f1d244d8a18e9edaea2f8f3350' // prettier-ignore
  //insert contract address above
);

export default instance;
