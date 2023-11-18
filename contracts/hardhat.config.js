// https://eth-sepolia.g.alchemy.com/v2/xcD3iWAmsxPO2dcTDxGMvuUu5T36jD9Y
// require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-waffle')

module.exports ={
  solidity: '0.8.0',
  networks:{
    sepolia:{
      url:'https://eth-sepolia.g.alchemy.com/v2/xcD3iWAmsxPO2dcTDxGMvuUu5T36jD9Y',
      accounts:['187b382c2900dba71b222dc6d1dbaff8276476e9d09edad59d14e37ae36dbbe4'] 
    }
  }
}
