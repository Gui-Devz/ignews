import Prismic from "@prismicio/client";

export function getPrismicClient(req?: unknown) {
  const apiEndpoint = "https://ignews197.cdn.prismic.io/api/v2";
  const Client = Prismic.client(apiEndpoint, {
    req,
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  return Client;
}
