// Data Models strictly following Airbnb style and project constraints

export type Jurisdiction = 'DE' | 'EU' | 'UK' | 'US';

export interface Source {
  id: string;
  publisher: string;
  url: string;
  lastVerified: string; // ISO Date
  excerpt: string; // Max 25 words
  jurisdiction: Jurisdiction;
  needsVerification: boolean;
}

export interface Fact {
  id: string;
  claim: string;
  sourceId: string;
}

export interface Regulation {
  id: string;
  topic: string;
  summary: string;
  sourceId: string;
}

export interface ProviderAttributes {
  annualFee: number;
  fxFeePercentage: number;
  hasCard: boolean;
  hasSavingsPlan: boolean; // Sparplan
  interestRate: number; // 0.04 = 4%
  isTaxConvenient: boolean; // Handles DE taxes automatically
  depositProtection: string;
  onboardingMethod: 'VideoIdent' | 'PostIdent' | 'eID';
}

export interface Provider {
  id: string;
  name: string;
  tagline: string;
  description: string;
  attributes: ProviderAttributes;
  supportedCountries: string[];
  factIds: string[]; // Links to Evidence
}

export interface RecommendationRequest {
  travelFrequency: 'low' | 'medium' | 'high';
  needFx: boolean;
  taxConvenience: 'critical' | 'preferred' | 'indifferent';
  strategy: 'saver' | 'investor' | 'balanced';
  riskTolerance: 'low' | 'medium' | 'high';
}

export interface RecommendationResult {
  providerId: string;
  score: number;
  reasoning: string[]; // "Because you said X..."
}
