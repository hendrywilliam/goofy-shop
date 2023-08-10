import { coreApi } from "@/lib/midtrans";

export async function POST(req: Request) {
  let parameter = {
    payment_type: "gopay",
    transaction_details: {
      order_id: "order-id-123",
      gross_amount: 100000,
    },
    customer_details: {
      first_name: "Budi",
      last_name: "Utomo",
      email: "budi.utomo@midtrans.com",
      phone: "081223323423",
      customer_details_required_fields: ["email", "first_name", "phone"],
    },
    custom_field1: "custom field 1 content",
    custom_field2: "custom field 2 content",
    custom_field3: "custom field 3 content",
    custom_expiry: {
      expiry_duration: 60,
      unit: "minute",
    },
    metadata: {
      you: "can",
      put: "any",
      parameter: "you like",
    },
  };

  const ngab = coreApi.charge(parameter).then((chargeResponse) => {
    console.log("chargeResponse");
    console.log(chargeResponse);
  });
  return ngab;
}
