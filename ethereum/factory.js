import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactor.interface)
  //INSERT FACTORY CONTRACT ADDRESS // prettier-ignore
);

export default instance;
