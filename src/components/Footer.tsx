import { Avatar, Box, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

interface FooterProps {
  visible?: boolean;
}

const Footer = ({ visible = true }: FooterProps) => {
  const [version, setVersion] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const version = document.getElementById("js-version")?.textContent;
    if (version) {
      setVersion(version);
    }
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <Box
      component="footer"
      sx={{
        display: "none", // Ẩn Footer
        position: "fixed",
        zIndex: 100,
        bottom: 0,
        width: "100%",
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        borderTop: "1px solid",
        borderColor: theme.palette.divider,
        fontSize: "0.89rem",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        p: 1,
        gap: "10px",
      }}
    >
      <Avatar
        src="./images/logo.png"
        sx={{ width: "1rem", height: "1rem", display: "inline-block", verticalAlign: "sub" }}
      />
      <Link href="https://github.com/etkecc/synapse-admin" target="_blank">
        Synapse Admin {version}
      </Link>
      by
      <Link
        href="https://etke.cc/?utm_source=synapse-admin&utm_medium=footer&utm_campaign=synapse-admin"
        target="_blank"
      >
        etke.cc
      </Link>
      (originally developed by Awesome Technologies Innovationslabor GmbH).
      <Link sx={{ fontWeight: "bold" }} href="https://matrix.to/#/#synapse-admin:etke.cc" target="_blank">
        #synapse-admin:etke.cc
      </Link>
    </Box>
  );
};

export default Footer;
