import { Routes, Route, Link } from "react-router";
import { useCurrentAccount, useCurrentWallet } from "@mysten/dapp-kit";
import { Layout } from "./layout/Layout";
import { Pools } from "../pools/Pools";
import { Portfolio } from "../portfolio/Portfolio";
import { Balance } from "../balance/Balance";
import { Profit } from "../profit/Profit";
import { ConnectWallet } from "../connectWallet/ConnectWallet";
import { Dialogs } from "../dialogs/Dialogs";
import { Spin } from "@trade-project/ui-toolkit";

export function Router() {
  const currentWallet = useCurrentWallet();
  const currentAccount = useCurrentAccount();

  if (currentWallet.isConnecting) {
    const spinPanel = (
      <div className="h-96 flex justify-center items-center">
        <Spin />
      </div>
    );
    return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={spinPanel} />
            <Route path="*" element={spinPanel} />
          </Route>
        </Routes>
      </>
    );
  }

  if (!currentAccount) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Pools />} />
            {/* <Route path="portfolio" element={<ConnectWallet />} />
            <Route path="balance" element={<ConnectWallet />} />
            <Route path="profit" element={<ConnectWallet />} /> */}
            <Route path="*" element={<ConnectWallet />} />
          </Route>
        </Routes>
        <Dialogs />
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Pools />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="balance" element={<Balance />} />
          <Route path="income" element={<Profit />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      <Dialogs />
    </>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
