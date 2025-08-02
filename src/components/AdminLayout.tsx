import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import PaymentIcon from "@mui/icons-material/Payment";
import { useEffect, useState, Suspense } from "react";
import {
  CheckForApplicationUpdate,
  AppBar,
  TitlePortal,
  InspectorButton,
  Confirm,
  Layout,
  Logout,
  Menu,
  useLogout,
  UserMenu,
  useStore,
  useLocaleState,
} from "react-admin";

import Footer from "./Footer";
import { LoginMethod } from "../pages/LoginPage";
import { MenuItem, GetConfig, ClearConfig } from "../utils/config";
import { Icons, DefaultIcon } from "../utils/icons";
import { ServerNotificationsBadge } from "./etke.cc/ServerNotificationsBadge";
import { ServerProcessResponse, ServerStatusResponse } from "../synapse/dataProvider";
import ServerStatusBadge from "./etke.cc/ServerStatusBadge";
import { ServerStatusStyledBadge } from "./etke.cc/ServerStatusBadge";

const AdminUserMenu = () => {
  const [open, setOpen] = useState(false);
  const logout = useLogout();
  const checkLoginType = (ev: React.MouseEvent<HTMLDivElement>) => {
    const loginType: LoginMethod = (localStorage.getItem("login_type") || "credentials") as LoginMethod;
    if (loginType === "accessToken") {
      ev.stopPropagation();
      setOpen(true);
    }
  };

  const handleConfirm = () => {
    setOpen(false);
    logout();
  };

  const handleDialogClose = () => {
    setOpen(false);
    ClearConfig();
    window.location.reload();
  };

  return (
    <UserMenu>
      <div onClickCapture={checkLoginType}>
        <Logout />
      </div>
      <Confirm
        isOpen={open}
        title="synapseadmin.auth.logout_acces_token_dialog.title"
        content="synapseadmin.auth.logout_acces_token_dialog.content"
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
        confirm="synapseadmin.auth.logout_acces_token_dialog.confirm"
        cancel="synapseadmin.auth.logout_acces_token_dialog.cancel"
      />
    </UserMenu>
  );
};

const AdminAppBar = () => {
  return (
    <AppBar userMenu={<AdminUserMenu />}>
      <TitlePortal />
      <ServerStatusBadge />
      <ServerNotificationsBadge />
      <InspectorButton />
    </AppBar>
  );
};

const AdminMenu = props => {
  const [menu, setMenu] = useState([] as MenuItem[]);
  const [etkeRoutesEnabled, setEtkeRoutesEnabled] = useState(false);
  useEffect(() => {
    setMenu(GetConfig().menu);
    if (GetConfig().etkeccAdmin) {
      setEtkeRoutesEnabled(true);
    }
  }, []);
  const [serverProcess, _setServerProcess] = useStore<ServerProcessResponse>("serverProcess", {
    command: "",
    locked_at: "",
  });
  const [serverStatus, _setServerStatus] = useStore<ServerStatusResponse>("serverStatus", {
    success: false,
    ok: false,
    host: "",
    results: [],
  });

  return (
    <Menu {...props}>
      {etkeRoutesEnabled && (
        <Menu.Item
          key="server_status"
          to="/server_status"
          leftIcon={
            <ServerStatusStyledBadge
              inSidebar={true}
              command={serverProcess.command}
              locked_at={serverProcess.locked_at}
              isOkay={serverStatus.ok}
              isLoaded={serverStatus.success}
            />
          }
          primaryText="Server Status"
        />
      )}
      {etkeRoutesEnabled && (
        <Menu.Item
          key="server_actions"
          to="/server_actions"
          leftIcon={<ManageHistoryIcon />}
          primaryText="Server Actions"
        />
      )}
      {etkeRoutesEnabled && <Menu.Item key="billing" to="/billing" leftIcon={<PaymentIcon />} primaryText="Billing" />}
      <Menu.ResourceItems />
      {menu &&
        menu.map((item, index) => {
          const { url, icon, label } = item;
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          const IconComponent = Icons[icon] as React.ComponentType<any> | undefined;

          return (
            <Suspense key={index}>
              <Menu.Item
                to={url}
                target="_blank"
                primaryText={label}
                leftIcon={IconComponent ? <IconComponent /> : <DefaultIcon />}
                onClick={props.onMenuClick}
              />
            </Suspense>
          );
        })}
    </Menu>
  );
};

export const AdminLayout = ({ children }) => {
  // Set the document language based on the selected locale
  const [locale, _setLocale] = useLocaleState();
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <>
      <Layout
        appBar={AdminAppBar}
        menu={AdminMenu}
        sx={{
          ["& .RaLayout-appFrame"]: {
            minHeight: "90vh",
            height: "90vh",
          },
          ["& .RaLayout-content"]: {
            marginBottom: "3rem",
          },
        }}
      >
        {children}
        <CheckForApplicationUpdate />
      </Layout>
      <Footer />
    </>
  );
};

export default AdminLayout;
