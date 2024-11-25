import { ConnectButton } from "@mysten/dapp-kit";
// import { ChevronDownIcon } from "@heroicons/react/16/solid";
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
  // Dropdown,
  // DropdownButton,
  // DropdownDivider,
  // DropdownItem,
  // DropdownLabel,
  // DropdownMenu,
} from "@trade-project/ui-toolkit";
import {
  // HomeIcon,
  AtSymbolIcon,
  BriefcaseIcon,
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
            <SidebarItem href="/">
              <Logo />
              <SidebarLabel className="pl-2">Terminal</SidebarLabel>
            </SidebarItem>
            {/* <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Logo />
                <SidebarLabel>Yield Terminal</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu
                className="min-w-80 lg:min-w-64"
                anchor="bottom start"
              >
                <DropdownItem href="/">
                  <Logo />
                  <DropdownLabel className="pl-3">Yield Terminal</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="https://terminal.mobi">
                  <HomeIcon />
                  <DropdownLabel>Home</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
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
