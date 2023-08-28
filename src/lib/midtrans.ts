import { CoreApi, Iris } from "midtrans-client";

export const coreAPI = new CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY as string,
  clientKey: process.env.MIDTRANS_CLIENT_KEY as string,
});

export const coreIris = new Iris({
  isProduction: false,
  serverKey: process.env.PAYOUT_CREATOR as string,
});
