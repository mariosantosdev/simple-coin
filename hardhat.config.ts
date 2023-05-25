import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    mumbai: {
        url: "https://rpc-mumbai.maticvigil.com",
        accounts: ['0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e'] // This is a public wallet, don't use it for anything else
    }
  }
};

export default config;
