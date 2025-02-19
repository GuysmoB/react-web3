import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { loadContract } from "./utils/load-contract";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

function App() {
  const [web3Api, setWeb3Api] = useState({ provider: null, web3: null, contract: null });
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [shouldReload, reload] = useState(false);

  const reloadEffect = () => reload(!shouldReload);
  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => setAccount(accounts[0]));
  };
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      const contract = await loadContract("Faucet", provider);

      if (provider) {
        setAccountListener(provider);
        setWeb3Api({ web3: new Web3(provider), provider, contract });
      } else {
        console.error("Install Metamask noob !");
      }
    };

    loadProvider();
  }, []);

  useEffect(() => {
    const loadbalance = async () => {
      const { contract, web3 } = web3Api;
      const balance = await web3.eth.getBalance(contract.address);
      setBalance(web3.utils.fromWei(balance, "ether"));
    };

    web3Api.contract && loadbalance();
  }, [web3Api, shouldReload]);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };

    web3Api.web3 && getAccount();
  }, [web3Api.web3]);

  const addFunds = useCallback(async () => {
    const { contract, web3 } = web3Api;
    await contract.addFunds({
      from: account,
      value: web3.utils.toWei("1", "ether"),
    });

    reloadEffect();
  }, [web3Api, account, reloadEffect]);

  const withdrawFunds = async () => {
    const { contract, web3 } = web3Api;
    const withdrawAmount = web3.utils.toWei("0.1", "ether");
    await contract.withdraw(withdrawAmount, { from: account });
    reloadEffect();
  };
  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          <div className="is-flex">
            <span>
              <strong>Account :</strong>
            </span>

            {account ? (
              <span>{account}</span>
            ) : (
              <button
                className="button is-small"
                onClick={() => web3Api.provider.request({ method: "eth_requestAccounts" })}
              >
                Connect Wallet
              </button>
            )}
          </div>
          <div className="balance-view is-size-2 mb-4">
            Current Balance: <strong>{balance}</strong>ETH
          </div>

          <button className="button is-link mr-2" onClick={addFunds}>
            Donate 1 ETH
          </button>
          <button className="button is-primary" onClick={withdrawFunds}>
            Withdraw
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
