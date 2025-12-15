export enum ProductType {
    PLAN = 'plan',
    GIFT = 'gift'
}

export enum PlanId {
    FREE = 'free',
    PRO = 'pro',
    CREATOR = 'creator'
}

export interface Plan {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    interval: string;
    type: ProductType;
    active: boolean;
    features: string[];
    stripePriceId: string;
    planId: string;
}
