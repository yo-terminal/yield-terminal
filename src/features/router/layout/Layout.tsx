import { ConnectButton } from "@mysten/dapp-kit";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
  SidebarLayout,
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@trade-project/ui-toolkit";
import {
  HomeIcon,
  LockClosedIcon,
  CommandLineIcon,
  AtSymbolIcon,
  BriefcaseIcon,
  ScaleIcon,
  // Cog6ToothIcon,
} from "@heroicons/react/20/solid";
import Logo from "./Logo";

export function Layout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <SidebarLayout
      sidebar={
        <Sidebar>
          <SidebarHeader>
            {/* <SidebarItem href="/">
              <Logo />
              <SidebarLabel className="pl-2">Terminal</SidebarLabel>
            </SidebarItem> */}
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Logo />
                <SidebarLabel>Terminal</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu
                className="min-w-80 lg:min-w-64"
                anchor="bottom start"
              >
                <DropdownItem href="/">
                  <CommandLineIcon />
                  <DropdownLabel>Terminal</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="https://keystore.terminal.mobi">
                  <LockClosedIcon />
                  <DropdownLabel>Keystore</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="https://terminal.mobi">
                  <HomeIcon />
                  <DropdownLabel>Home</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem
                current={pathname === "/"}
                onClick={() => {
                  navigate("/");
                }}
              >
                <AtSymbolIcon />
                <SidebarLabel>Pools</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                current={pathname === "/portfolio"}
                onClick={() => {
                  navigate("/portfolio");
                }}
              >
                <BriefcaseIcon />
                <SidebarLabel>Portfolio</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                current={pathname === "/balance"}
                onClick={() => {
                  navigate("/balance");
                }}
              >
                <ScaleIcon />
                <SidebarLabel>Balance</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSpacer />
            <SidebarSection>
              {/* <SidebarItem
                onClick={() => {
                  alert("In Development...");
                }}
              >
                <Cog6ToothIcon />
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem> */}
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="connect-button">
            <ConnectButton />
          </SidebarFooter>
        </Sidebar>
      }
    >
      <Outlet />
    </SidebarLayout>
  );
}
