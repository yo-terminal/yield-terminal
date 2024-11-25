import { Routes, Route, Link } from "react-router-dom";
import { useCurrentAccount, useCurrentWallet } from "@mysten/dapp-kit";
import { Layout } from "./layout/Layout";
import { Pools } from "../pools/Pools";
import { Portfolio } from "../portfolio/Portfolio";
import { ConnectWallet } from "../connectWallet/ConnectWallet";
import { Dialogs } from "../dialogs/Dialogs";

export function Router() {
  const currentWallet = useCurrentWallet();
  const currentAccount = useCurrentAccount();

  if (currentWallet.isConnecting) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div />} />
            <Route path="*" element={<div />} />
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
            <Route index element={<ConnectWallet />} />
            <Route path="*" element={<ConnectWallet />} />
          </Route>
        </Routes>
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Pools />} />
          <Route path="portfolio" element={<Portfolio />} />
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
