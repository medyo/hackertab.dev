export type MarketingConfig = {
  enabled: boolean;
  campaigns_interval: number;
  version: number;
  campaigns: Campaign[]
}

export type Campaign = {
  id: string;
  name: string;
  htmlContent: string;
  condition: string;
  enabled: boolean;
  userAtttributes?: UserAttribute;
  priority?: number
}

type UserAttribute = {
  [key: string]: string | number | string[];
}