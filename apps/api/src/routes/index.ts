import { Router } from 'express';
import providersData from '../data/providers.json';
import sourcesData from '../data/sources.json';
import factsData from '../data/facts.json';
import { RecommendationRequest, RecommendationResult, Provider } from '@trade-gorilla/shared';

const router = Router();

// Typed helper for JSON imports
const providers = providersData as Provider[];

// 1. Get All Providers
router.get('/providers', (req, res) => {
  res.json(providers);
});

// 2. Get Single Provider
router.get('/providers/:id', (req, res) => {
  const provider = providers.find((p) => p.id === req.params.id);
  if (!provider) {
    res.status(404).json({ error: 'Provider not found' });
    return;
  }
  res.json(provider);
});

// 3. Get Sources (Evidence Library)
router.get('/sources', (req, res) => {
  res.json(sourcesData);
});

// 4. Get Facts (Claims)
router.get('/facts', (req, res) => {
  res.json(factsData);
});

// 5. Recommendation Engine (The "Decision Logic")
router.post('/recommend', (req, res) => {
  const prefs = req.body as RecommendationRequest;
  
  // Logic: Score providers based on simple additive rules
  const scores = providers.map((provider) => {
    let score = 0;
    const reasoning: string[] = [];

    // Rule 1: FX Fees vs Travel
    if (prefs.travelFrequency === 'high' || prefs.needFx) {
      if (provider.attributes.fxFeePercentage === 0) {
        score += 10;
        reasoning.push('Great for travel: No FX fees.');
      } else {
        score -= 5;
        reasoning.push(`Charge ${provider.attributes.fxFeePercentage}% FX fees.`);
      }
    }

    // Rule 2: Tax Convenience (Critical for DE users)
    if (prefs.taxConvenience === 'critical') {
      if (provider.attributes.isTaxConvenient) {
        score += 15;
        reasoning.push('Handles German taxes automatically.');
      } else {
        score -= 20; // Heavy penalty
        reasoning.push('Does NOT handle taxes automatically.');
      }
    }

    // Rule 3: Strategy (Saver vs Investor)
    if (prefs.strategy === 'saver') {
      if (provider.attributes.interestRate > 0.02) {
        score += 10;
        reasoning.push(`High interest rate: ${(provider.attributes.interestRate * 100).toFixed(2)}%.`);
      }
    } else if (prefs.strategy === 'investor') {
      if (provider.attributes.hasSavingsPlan) {
        score += 10;
        reasoning.push('Offers ETF Savings Plans.');
      }
    }

    return {
      providerId: provider.id,
      score,
      reasoning,
    };
  });

  // Sort by score descending and take top 3
  const topRecommendations: RecommendationResult[] = scores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  res.json(topRecommendations);
});

export default router;
