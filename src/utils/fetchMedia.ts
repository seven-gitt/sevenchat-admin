export const getServerAndMediaIdFromMxcUrl = (mxcUrl: string): { serverName: string; mediaId: string } => {
  const re = /^mxc:\/\/([^/]+)\/([\w-]+)$/;
  const ret = re.exec(mxcUrl);
  if (ret == null) {
    return { serverName: "", mediaId: "" };
  }
  const serverName = ret[1];
  const mediaId = ret[2];
  return { serverName, mediaId };
};

export type MediaType = "thumbnail" | "original";

export const fetchAuthenticatedMedia = async (mxcUrl: string, type: MediaType): Promise<Response> => {
  const homeserver = localStorage.getItem("base_url");
  const accessToken = localStorage.getItem("access_token");

  const { serverName, mediaId } = getServerAndMediaIdFromMxcUrl(mxcUrl);
  if (!serverName || !mediaId) {
    console.error("Invalid mxcUrl", mxcUrl, "serverName:", serverName, "mediaId:", mediaId);
    return new Response(null, { status: 400, statusText: "Invalid mxcUrl" });
  }

  let url = "";
  if (type === "thumbnail") {
    // ref: https://spec.matrix.org/latest/client-server-api/#thumbnails
    url = `${homeserver}/_matrix/client/v1/media/thumbnail/${serverName}/${mediaId}?width=320&height=240&method=scale`;
  } else if (type === "original") {
    url = `${homeserver}/_matrix/client/v1/media/download/${serverName}/${mediaId}`;
  } else {
    throw new Error("Invalid authenticated media type");
  }

  const response = await fetch(`${url}`, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};
