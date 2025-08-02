import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CircularProgress,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  Form,
  FormDataConsumer,
  Notification,
  required,
  useLogin,
  useNotify,
  useLocaleState,
  useTranslate,
  PasswordInput,
  TextInput,
  SelectInput,
  useLocales,
} from "react-admin";
import { useFormContext } from "react-hook-form";

import { useAppContext } from "../Context";
import Footer from "../components/Footer";
import LoginFormBox from "../components/LoginFormBox";
import {
  getServerVersion,
  getSupportedFeatures,
  getSupportedLoginFlows,
  getWellKnownUrl,
  isValidBaseUrl,
  splitMxid,
} from "../synapse/matrix";

export type LoginMethod = "credentials" | "accessToken";

const LoginPage = () => {
  const login = useLogin();
  const notify = useNotify();
  const { restrictBaseUrl } = useAppContext();
  const allowSingleBaseUrl = typeof restrictBaseUrl === "string" && restrictBaseUrl !== "";
  const allowMultipleBaseUrls =
    Array.isArray(restrictBaseUrl) &&
    restrictBaseUrl.length > 0 &&
    restrictBaseUrl[0] !== "" &&
    restrictBaseUrl[0] !== null;
  const baseUrlChoices = allowMultipleBaseUrls ? restrictBaseUrl.map(url => ({ id: url, name: url })) : [];
  const allowAnyBaseUrl = !(allowSingleBaseUrl || allowMultipleBaseUrls);
  const localStorageBaseUrl = localStorage.getItem("base_url");
  let base_url = allowSingleBaseUrl ? restrictBaseUrl : localStorageBaseUrl;
  if (allowMultipleBaseUrls && localStorageBaseUrl && !restrictBaseUrl.includes(localStorageBaseUrl)) {
    // don't set base_url if it is not in the restrictBaseUrl array
    base_url = null;
  }
  // Set default URL if no base_url is available
  if (!base_url && allowAnyBaseUrl) {
    base_url = "https://sevenchat.space";
  }
  const [loading, setLoading] = useState(false);
  const [supportPassAuth, setSupportPassAuth] = useState(true);
  const [locale, setLocale] = useLocaleState();
  const locales = useLocales();
  const translate = useTranslate();

  const [ssoBaseUrl, setSSOBaseUrl] = useState("");
  const loginToken = new URLSearchParams(window.location.search).get("loginToken");
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("credentials");
  const [serverVersion, setServerVersion] = useState("");
  const [matrixVersions, setMatrixVersions] = useState("");

  useEffect(() => {
    if (base_url) {
      checkServerInfo(base_url);
    }
  }, []);

  useEffect(() => {
    if (!loginToken) {
      return;
    }

    console.log("SSO token is", loginToken);
    // Prevent further requests
    const previousUrl = new URL(window.location.toString());
    previousUrl.searchParams.delete("loginToken");
    window.history.replaceState({}, "", previousUrl.toString());
    const baseUrl = localStorage.getItem("sso_base_url");
    localStorage.removeItem("sso_base_url");
    if (baseUrl) {
      const auth = {
        base_url: baseUrl,
        username: null,
        password: null,
        loginToken,
      };
      console.log("Base URL is:", baseUrl);
      console.log("SSO Token is:", loginToken);
      console.log("Let's try token login...");
      login(auth).catch(error => {
        alert(
          typeof error === "string"
            ? error
            : typeof error === "undefined" || !error.message
              ? "ra.auth.sign_in_error"
              : error.message
        );
        console.error(error);
      });
    }
  }, [loginToken]);

  const validateBaseUrl = value => {
    if (!value.match(/^(http|https):\/\//)) {
      return translate("synapseadmin.auth.protocol_error");
    } else if (!value.match(/^(http|https):\/\/[a-zA-Z0-9\-.]+(:\d{1,5})?[^?&\s]*$/)) {
      return translate("synapseadmin.auth.url_error");
    } else {
      return undefined;
    }
  };

  const handleSubmit = auth => {
    setLoading(true);
    const cleanUrl = window.location.href.replace(window.location.search, "");
    window.history.replaceState({}, "", cleanUrl);

    login(auth).catch(error => {
      setLoading(false);
      notify(
        typeof error === "string"
          ? error
          : typeof error === "undefined" || !error.message
            ? "ra.auth.sign_in_error"
            : error.message,
        { type: "warning" }
      );
    });
  };

  const handleSSO = () => {
    localStorage.setItem("sso_base_url", ssoBaseUrl);
    const ssoFullUrl = `${ssoBaseUrl}/_matrix/client/r0/login/sso/redirect?redirectUrl=${encodeURIComponent(
      window.location.href
    )}`;
    window.location.href = ssoFullUrl;
  };

  const checkServerInfo = async (url: string) => {
    if (!isValidBaseUrl(url)) {
      setServerVersion("");
      setMatrixVersions("");
      setSupportPassAuth(false);
      setSSOBaseUrl("");
      return;
    }

    try {
      const serverVersion = await getServerVersion(url);
      setServerVersion(`${translate("synapseadmin.auth.server_version")} ${serverVersion}`);
    } catch {
      setServerVersion("");
    }

    try {
      const features = await getSupportedFeatures(url);
      setMatrixVersions(`${translate("synapseadmin.auth.supports_specs")} ${features.versions.join(", ")}`);
    } catch {
      setMatrixVersions("");
    }

    // Set SSO Url
    try {
      const loginFlows = await getSupportedLoginFlows(url);
      const supportPass = loginFlows.find(f => f.type === "m.login.password") !== undefined;
      const supportSSO = loginFlows.find(f => f.type === "m.login.sso") !== undefined;
      setSupportPassAuth(supportPass);
      setSSOBaseUrl(supportSSO ? url : "");
    } catch {
      setSupportPassAuth(false);
      setSSOBaseUrl("");
    }
  };

  const UserData = ({ formData }) => {
    const form = useFormContext();

    const handleUsernameChange = async () => {
      if (formData.base_url || allowSingleBaseUrl) {
        return;
      }
      // check if username is a full qualified userId then set base_url accordingly
      const domain = splitMxid(formData.username)?.domain;
      if (domain) {
        const url = await getWellKnownUrl(domain);
        if (allowAnyBaseUrl || (allowMultipleBaseUrls && restrictBaseUrl.includes(url))) {
          form.setValue("base_url", url, {
            shouldValidate: true,
            shouldDirty: true,
          });
          checkServerInfo(url);
        }
      }
    };

    const handleBaseUrlBlurOrChange = event => {
      // Get the value either from the event (onChange) or from formData (onBlur)
      const value = event?.target?.value || formData.base_url;

      if (!value) {
        return;
      }

      // Trigger validation only when user finishes typing/selecting
      form.trigger("base_url");
      checkServerInfo(value);
    };

    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const hostname = window.location.hostname;
      const username = params.get("username");
      const password = params.get("password");
      const accessToken = params.get("accessToken");
      let serverURL = params.get("server");

      if (username) {
        form.setValue("username", username);
      }

      if (hostname === "localhost" || hostname === "127.0.0.1") {
        if (password) {
          form.setValue("password", password);
        }
        if (accessToken) {
          setLoginMethod("accessToken");
          form.setValue("accessToken", accessToken);
        }
      }

      if (serverURL) {
        const isFullUrl = serverURL.match(/^(http|https):\/\//);
        if (!isFullUrl) {
          serverURL = `https://${serverURL}`;
        }

        form.setValue("base_url", serverURL, {
          shouldValidate: true,
          shouldDirty: true,
        });

        checkServerInfo(serverURL);
      }
    }, [window.location.search]);

    return (
      <>
        <Tabs
          value={loginMethod}
          onChange={(_, newValue) => setLoginMethod(newValue as LoginMethod)}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label={translate("synapseadmin.auth.credentials")} value="credentials" />
          <Tab label={translate("synapseadmin.auth.access_token")} value="accessToken" />
        </Tabs>
        {loginMethod === "credentials" ? (
          <>
            <Box>
              <TextInput
                source="username"
                label="ra.auth.username"
                autoComplete="username"
                onBlur={handleUsernameChange}
                resettable
                validate={required()}
                {...(loading || !supportPassAuth ? { disabled: true } : {})}
              />
            </Box>
            <Box>
              <PasswordInput
                source="password"
                label="ra.auth.password"
                type="password"
                autoComplete="current-password"
                {...(loading || !supportPassAuth ? { disabled: true } : {})}
                resettable
                validate={required()}
              />
            </Box>
          </>
        ) : (
          <Box>
            <TextInput
              source="accessToken"
              label="synapseadmin.auth.access_token"
              {...(loading ? { disabled: true } : {})}
              resettable
              validate={required()}
            />
          </Box>
        )}
        <Box>
          {allowMultipleBaseUrls && (
            <SelectInput
              source="base_url"
              label="synapseadmin.auth.base_url"
              select={allowMultipleBaseUrls}
              autoComplete="url"
              {...(loading ? { disabled: true } : {})}
              onChange={handleBaseUrlBlurOrChange}
              validate={[required(), validateBaseUrl]}
              choices={baseUrlChoices}
            />
          )}
          {!allowMultipleBaseUrls && (
            <TextInput
              source="base_url"
              label="synapseadmin.auth.base_url"
              autoComplete="url"
              {...(loading ? { disabled: true } : {})}
              readOnly={allowSingleBaseUrl}
              resettable={allowAnyBaseUrl}
              validate={[required(), validateBaseUrl]}
              onBlur={handleBaseUrlBlurOrChange}
            />
          )}
        </Box>
        <Typography className="serverVersion">{serverVersion}</Typography>
        <Typography className="matrixVersions">{matrixVersions}</Typography>
      </>
    );
  };

  return (
    <Form defaultValues={{ base_url: base_url || "https://sevenchat.space/" }} onSubmit={handleSubmit} mode="onBlur">
      <LoginFormBox>
        <Card className="card">
          <Box className="avatar">
            {loading ? (
              <CircularProgress size={25} thickness={2} />
            ) : (
              <Avatar sx={{ width: "120px", height: "120px" }} src="./images/logo.webp" />
            )}
          </Box>
          <Box className="hint">{translate("synapseadmin.auth.welcome")}</Box>
          <Box className="form">
            <Select
              fullWidth
              value={locale}
              onChange={e => setLocale(e.target.value)}
              disabled={loading}
              className="select"
            >
              {locales.map(l => (
                <MenuItem key={l.locale} value={l.locale}>
                  {l.name}
                </MenuItem>
              ))}
            </Select>
            <FormDataConsumer>{formDataProps => <UserData {...formDataProps} />}</FormDataConsumer>
            {loginMethod === "credentials" && (
              <CardActions className="actions">
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={loading || !supportPassAuth}
                  fullWidth
                >
                  {translate("ra.auth.sign_in")}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSSO}
                  disabled={loading || ssoBaseUrl === ""}
                  fullWidth
                >
                  {translate("synapseadmin.auth.sso_sign_in")}
                </Button>
              </CardActions>
            )}
            {loginMethod === "accessToken" && (
              <CardActions className="actions">
                <Button variant="contained" type="submit" color="primary" disabled={loading} fullWidth>
                  {translate("ra.auth.sign_in")}
                </Button>
              </CardActions>
            )}
          </Box>
        </Card>
      </LoginFormBox>
      <Notification />
      <Footer />
    </Form>
  );
};

export default LoginPage;
