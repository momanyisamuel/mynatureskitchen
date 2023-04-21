export type Price = {
    id: string;
    object: string;
    active: boolean;
    billing_scheme: string;
    created: number;
    currency: string;
    custom_unit_amount: null | number | CustomUnitAmount;
    livemode: boolean;
    lookup_key: null | string;
    metadata: Record<string, unknown>;
    nickname: null | string;
    product: {
      id: string;
      object: string;
      active: boolean;
      attributes: string[];
      created: number;
      default_price: string;
      description: string;
      images: string[];
      livemode: boolean;
      metadata: Record<string, unknown>;
      name: string;
      package_dimensions: null;
      shippable: null;
      statement_descriptor: null;
      tax_code: null;
      type: string;
      unit_label: null;
      updated: number;
      url: null;
    };
    recurring: {
      aggregate_usage: null;
      interval: string;
      interval_count: number;
      trial_period_days: null;
      usage_type: string;
    };
    tax_behavior: string;
    tiers_mode: null;
    transform_quantity: null;
    type: string;
    unit_amount: number;
    unit_amount_decimal: string;
  };
  
  export type Prices = Price[];