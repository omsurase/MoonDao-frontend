const Web3 = require("web3");
const BridgeEth = require("");
const BridgeBsc = require("");

const web3Eth = new Web3("");
const web3Bsc = new Web3("");
const adminPrivKey = "";
const { address: admin } = web3Bsc.eth.accounts.wallet.add(adminPrivKey);

const bridgeEth = new web3Eth.eth.Contract(
  BridgeEth.abi,
  BridgeEth.networks["4"].address
);

const bridgeBsc = new web3Bsc.eth.Contract(
  BridgeBsc.abi,
  BridgeBsc.networks["97"].address
);

bridgeEth.events
  .Transfer({ fromBlock: 0, step: 0 })
  .on("data", async (event) => {
    const { from, to, amount, date, nonce } = event.returnValues;

    const tx = bridgeBsc.methods.mint(to, amount, nonce);
    const [gasPrice, gasCost] = await Promise.all([
      web3Bsc.eth.getGasPrice(),
      tx.estimateGas({ from: admin }),
    ]);
    const data = tx.encodeABI();
    const txData = {
      from: admin,
      to: bridgeBsc.options.address,
      data,
      gas: gasCost,
      gasPrice,
    };
    const receipt = await web3Bsc.eth.sendTransaction(txData);
    console.log(`Transaction hash: ${receipt.transactionHash}`);
    console.log(`
    Processed transfer:
    - from ${from} 
    - to ${to} 
    - amount ${amount} tokens
    - date ${date}
  `);
  });
