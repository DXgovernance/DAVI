# Project-DAVI  

Project-DAVI is built by DXdao as an all in one interface for our on-chain governance systems. 
Supported systems: 
- ERC20 guilds
  - Smaller scale DAO's whose voting power is tied to ERC20 tokens locked in a vault
- Soulbound guilds (Non-transferable REP)
  - An extension to token guilds where the token can only be minted and burned by the DAO, no transferring power. 
  - Great for smaller communities to coordinate and start operating as a decentralized autonomous collective 
- Governance 2.0 (coming soon)
  - The novel governance system designed by DXdao to enable voting power based on a combination of ERC20 tokens and non transferable soulbound tokens
  - A larger system made up of multiple schemes with distinct purposes, permissions, security and funds all built around the main DAO's secure treasury

## Main features
### Accessible Autonomy
At the core of DAVI is supporting on chain actions and autonomy.
But there is an issue with current solutions to this, they require technical knowledge. Its our belief that on chain autonomy should be accessible to the point that anyone can govern a DAO on our platform. 

To achieve this we have a modular interface, the action builder, powered by rich contract data that is curated and designed by technical users that understand the contracts without requiring them to write code. This shifts the technical knowledge requirements to the maintainers of the configuration instead of the end users. And best of all it is all powered by remote configurations managed by ENS domains (currently maintained by DXgov team). 
### Flexible architecture 
For the most part governance requires very similar interfaces and components regardless of the contracts. So we designed our great UX and UI elements to be flexible enough to adapt to different data and logic layers that can be placed on top of them.

This allows us to support a wide range of DAOs from the smaller soulbound guilds to larger token based guilds or even full large scale Gov 2.0 DAOs with multiple schemes and guilds attached to it. 

This is the structure we will use to quickly integrate gov 2.0 in the existing guild supporting application. Hopefully also simplifying maintenance and code readability. 
### Social
Off chain governance closely linked with on chain governance whilst keeping decentralized values by utilizing orbis.club and ceramic, enabling data portability and user ownership.
### DAO-DAO governance
Related to accessible autonomy one of the toughest parts of on chain interactions to make accessible and smooth is one DAO using its voting power in another DAO. Its perfectly possible to do this via the action builder but a more advanced dynamic proposal mirroring interface is planned.

The first example of this will be DXD guild voting in DXdao's currently REP based governance system. 

Later this is planned to evolve into a revenue generated governance consultancy service for DAVI DAOs. 
### Decentralization and transparency
Core to all of what DXdao does, we aim to enable as much decentralization as possible whether that be the ENS powered and DAO owned frontend & application configuration or the use of fallbacks in place of failing dependencies. All of our code is open source and maintained by a team of contributors to DXdao. 

## Versions
### Stable Release
Hosted in https://project-davi.eth.limo and under control of dxdao via ENS+IPFS.
### Staging QA Environment
Available in https://development.project-davi.eth.limo and controlled by project owner via ENS+IPNS.

## Development environment setup  
The following steps should get the app up and running:

1. Fork DAVI repo
2. ``` git checkout develop ```
3. ``` yarn ```
4. ``` yarn dev ```

The development script will start a local hardhat node, deploy all dxdao contracts with local development configuration and start the dapp with the development configuration in the port 3000.

### Wallet 
- Use whichever wallet you enjoy (tested mostly with firefox and frame.sh)
- Import a test account you can find in `hardhat.config.js`
- You may need to reset accounts after running yarn dev in metamask, try `Settings` -> `Advanced` -> `Reset Account on your wallet` (this will not remove any accounts)


## Links 
- [Contracts repo](https://github.com/DXgovernance/dxdao-contracts)
- [Sprint board](https://github.com/orgs/DXgovernance/projects/7/views/1)
- [Feedback & Roadmap](https://davi.canny.io/)
