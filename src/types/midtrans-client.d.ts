declare module "midtrans-client" {
  declare class CoreApi {
    constructor({
      isProduction,
      serverKey,
      clientKey,
    }: {
      isProduction: boolean;
      serverKey: string;
      clientKey: string;
    });

    /**
     * @see https://docs.midtrans.com/reference/charge-transactions-1
     */

    capture(parameter: {
      payment_type: string;
      transaction_details: {
        order_id: string;
        gross_amount: number;
      };
      customer_details: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        customer_details_required_fields: [
          email: string,
          first_name: string,
          phone: string
        ];
      };
      custom_field1: string;
      custom_field2: string;
      custom_field3: string;
      custom_expiry: {
        expiry_duration: number;
        unit: string;
      };
      metadata: Record<string, unknown>;
    }): Promise<
      | ResultSuccess
      | DuplicateOrderId
      | ValidationError
      | AuthorizationError
      | APILimitExceeded
    >;

    charge(
      parameter: ChargeParameters
    ): Promise<
      | ResultSuccess
      | DuplicateOrderId
      | ValidationError
      | AuthorizationError
      | APILimitExceeded
    >;
  }

  declare class Iris {
    constructor(options?: { isProduction: boolean; serverKey: string });

    /**
     * Use this API for Approver to approve multiple payout request.
     * @param parameter
     */

    approvePayouts(parameter: {
      reference_nos: string | string[];
      otp: string;
    }): Promise<{ status: string }>;

    /**
     * Use this API to create a new beneficiary information for quick access on the Payout page in Midtrans Dashboard.
     * @param parameter
     */

    createBeneficiaries(parameter: {
      name: string;
      account: number;
      bank: string;
      alias_name: string;
      email?: string;
    }): Promise<{
      status: string;
    }>;

    /**
     * This API is for Creator to create a payout. It can be used for single payout and also multiple payouts.
     * @param parameter
     */

    createPayouts(parameter: {
      payouts: {
        beneficiary_name: string;
        beneficiary_account: number;
        beneficiary_bank: string;
        beneficiary_email?: string;
        amount: string;
        notes: string;
        bank_account_id?: string;
      }[];
    }): Promise<{
      payouts: {
        status: string;
        reference_no: string;
      }[];
    }>;

    /**
     * For Aggregator Partner, you need to top up to Payouts' bank account. Every partner have their own balance in Payouts' bank account. Use this API is to get current balance information.
     */

    getBalance(): Promise<{
      balance: string;
    }>;

    /**
     * Use this API to fetch list of all beneficiaries saved in Midtrans Dashboard.
     */

    getBeneficiaries(): Promise<{
      name: string;
      bank: string;
      account: string;
      alias_name: string;
      email: string;
    }>;

    /**
     * Show list of supported banks in Payouts.
     */

    getBeneficiaryBanks(): Promise<{
      beneficiary_banks: {
        code: string;
        name: string;
      }[];
    }>;

    /**
     * For Facilitator Partner, use this API is to get current balance information of your registered bank account.
     * @param {string} bank_account_id
     */

    getFacilitatorBalance(bank_account_id: string): Promise<{
      balance: string;
    }>;

    /**
     * Show list of registered bank accounts for facilitator partner.
     * @param args
     */

    getFacilitatorBankAccounts(): Promise<
      {
        bank_account_id: string;
        bank_name: string;
        account_name: string;
        account_number: string;
        status: string;
      }[]
    >;

    /**
     * Get details of a single payout.
     * @param {string} reference_no
     */

    getPayoutDetails(referenceNo): Promise<{
      amount: string;
      beneficiary_name: string;
      beneficiary_account: string;
      bank: string;
      reference_no: string;
      notes: string;
      beneficiary_email: string;
      status: string;
      created_by: string;
      created_at: string;
      updated_at: string;
    }>;

    /**
     * Provide top up information channel for Aggregator Partner.
     */

    getTopupChannels(): Promise<{
      id: number;
      virtual_account_type: string;
      virtual_account_number: string;
    }>;

    /**
     * List all transactions history for a month. You can specified start date and also end date for range transaction history.
     * @param parameters
     */

    getTransactionHistory(parameters: {
      from_date: string;
      to_date: string;
    }): void;

    /**
     * simple ping bruh
     */

    ping(): void;

    /**
     *
     * @param args
     */

    rejectPayouts(parameter: {
      reference_nos: string[];
      reject_reason: string;
    }): Promise<{ status: string }>;

    /**
     * Use this API to update an existing beneficiary identified by its alias_name.
     * @param args
     */

    updateBeneficiaries(
      aliasName: string,
      parameter: {
        name: string;
        account: string;
        bank: string;
        alias_name: string;
        email: string;
      }
    ): Promise<{ status: string }>;

    /**
     * Check if an account is valid, if valid return account information.
     * @param parameter
     * @see https://docs.midtrans.com/reference/validate-bank-account
     */

    validateBankAccount(parameter: { bank: string; account: string }): Promise<
      | {
          id: string;
          account_name: string;
          account_no: string;
          bank_name: string;
        }
      | {
          id: string;
          error_message: string;
          errors: {
            account: string[];
          };
        }
    >;
  }
}

declare interface ResultSuccess {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  currency: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
  actions: {
    name: string;
    method: string;
    url: string;
  };
  qr_string: string;
  acquirer: string;
  expire_time: string;
}

declare interface DuplicateOrderId {
  status_code: string;
  status_message: string;
  id: string;
}

declare interface ValidationError {
  status_code: string;
  status_message: string;
  validation_messages: string[];
  id: string;
}

declare interface AuthorizationError {
  status_code: string;
  status_message: string;
}

declare interface APILimitExceeded {
  message: string;
}

declare interface ChargeParameters {
  payment_type: string;
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  customer_details: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    customer_details_required_fields: string[];
  };
  custom_field1: string;
  custom_field2: string;
  custom_field3: string;
  custom_expiry: {
    expiry_duration: number;
    unit: string;
  };
  metadata: {
    [key: string]: string;
  };
}
