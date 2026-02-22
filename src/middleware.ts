import { paymentMiddleware } from "x402-next";

const payTo = (process.env.X402_PAYTO_ADDRESS || "0x0000000000000000000000000000000000000000") as `0x${string}`;

export const middleware = paymentMiddleware(
  payTo,
  {
    "/api/generate": {
      price: "$49.00",
      network: "base",
      config: {
        description: "Full Launch Kit Generation",
      },
    },
  },
  {
    url: "https://x402.org/facilitator",
  }
);

export const config = {
  matcher: ["/api/generate"],
};
