#!/bin/bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "projectName": "Sonar",
    "description": "ProductHunt for AI agents on Base. Builders list products, community upvotes, promoted spots pay in $SNR.",
    "targetAudience": "Base chain builders and AI agent developers",
    "hasToken": true,
    "tokenUtility": "Pay for promoted spots and featured listings on the launchpad",
    "uniqueProblem": "No focused discovery layer for Base-native AI agents and tools",
    "initialLiquidity": "10000",
    "launchDate": "2026-03-15",
    "communitySize": "500",
    "differentiator": "First launchpad specialized for AI agents on Base with $SNR token utility",
    "revenueModel": "Promoted spots in $SNR or USDC, subscription tiers for builders"
  }'
