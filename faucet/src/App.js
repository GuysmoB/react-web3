import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const loadProvider = async () => {};
  }, []);

  return (
    <>
      <div className="faucet-wrapper">
        <div className="faucet">
          <div className="balance-view is-size-2">
            Current Balance: <strong>10</strong>ETH
          </div>
          <button
            className="btn mr-2"
            onClick={async () => {
              const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            }}
          >
            Enable Ethereum
          </button>
          <button className="btn mr-2">Donate</button>
          <button className="btn mr-2">Withdraw</button>
        </div>
      </div>
    </>
  );
}

export default App;
