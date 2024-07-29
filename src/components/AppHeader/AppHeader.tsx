import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
} from "@carbon/react";
import { Switcher, Notification, UserAvatar } from "@carbon/icons-react";
import Link from "next/link";

const AppHeader = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header aria-label="Identity & Access Manager">
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        <Link href="/" passHref legacyBehavior>
          <HeaderName prefix="">Identity & Access Manager</HeaderName>
        </Link>
        <HeaderNavigation aria-label="Identity & Access Manager">
          <Link href="/users" passHref legacyBehavior>
            <HeaderMenuItem>Users</HeaderMenuItem>
          </Link>
          <Link href="/roles" passHref legacyBehavior>
            <HeaderMenuItem>Roles</HeaderMenuItem>
          </Link>
          <Link href="/permissions" passHref legacyBehavior>
            <HeaderMenuItem>Permissions</HeaderMenuItem>
          </Link>
        </HeaderNavigation>
        <SideNav
          aria-label="Side navigation"
          expanded={isSideNavExpanded}
          isPersistent={false}
        >
          <SideNavItems>
            <HeaderSideNavItems>
              <Link href="/users" passHref legacyBehavior>
                <HeaderMenuItem>Users</HeaderMenuItem>
              </Link>
              <Link href="/roles" passHref legacyBehavior>
                <HeaderMenuItem>Roles</HeaderMenuItem>
              </Link>
              <Link href="/permissions" passHref legacyBehavior>
                <HeaderMenuItem>Permissions</HeaderMenuItem>
              </Link>
            </HeaderSideNavItems>
          </SideNavItems>
        </SideNav>
        <HeaderGlobalBar>
          <HeaderGlobalAction
            aria-label="Notifications"
            tooltipAlignment="center"
            className="action-icons"
          >
            <Notification size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="User Avatar"
            tooltipAlignment="center"
            className="action-icons"
          >
            <UserAvatar size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="App Switcher" tooltipAlignment="end">
            <Switcher size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
    )}
  />
);

export default AppHeader;
