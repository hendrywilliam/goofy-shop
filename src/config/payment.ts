export const paymentChannels = [
  {
    name: "Permata",
    bank: "permata",
  },
  {
    name: "BCA",
    bank: "bca",
  },
  {
    name: "BNI",
    bank: "bni",
  },
  {
    name: "BRI",
    bank: "bri",
  },
] satisfies { name: string; bank: string }[];

export const payoutBanks = [
  {
    code: "bri",
    bankName: "PT. BANK RAKYAT INDONESIA (PERSERO)",
  },
  {
    code: "bca",
    bankName: "PT. BANK CENTRAL ASIA TBK.",
  },
  {
    code: "permata",
    bankName: "PT. BANK PERMATA TBK.",
  },
  {
    code: "bni",
    bankName: "PT. BANK NEGARA INDONESIA (PERSERO)",
  },
] satisfies Record<"code" | "bankName", string>[];
