import { Routes, Route, Link } from "react-router-dom";
import { useCurrentAccount, useCurrentWallet } from "@mysten/dapp-kit";
import { Layout } from "./layout/Layout";
import { Root } from "../root/Root";
import { Pool } from "../pool/Pool";
import { ConnectWallet } from "../connectWallet/ConnectWallet";

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
          <Route index element={<Root />} />
          <Route path="pool/:id" element={<Pool />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
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
