# AGENTS.md

## Project Overview

SmartLegacy is a **React Native + Expo** mobile application built with:

-   TypeScript (strict mode)
-   Expo Router
-   Modular feature-based architecture
-   IOTA Move L1 integration
-   Non-custodial wallet architecture
-   Passkey-based signing (no seed phrases)
-   Accessibility-first design
-   Full internationalization

This is a **production-grade mobile application**, not a prototype
playground.

All contributions must respect:

-   Mobile-first UX
-   Performance
-   Cross-platform compatibility (iOS + Android)
-   Legal-tech usability (senior-friendly)
-   Non-crypto-native user experience

------------------------------------------------------------------------

# 🚨 Core Architectural Rules (Critical)

## 1. Non-Custodial Only

-   Private keys are NEVER stored on backend
-   Backend NEVER signs transactions
-   No seed phrases in UX
-   No external browser-based wallet flows
-   No custodial fallback logic

All signing must be:

-   Local
-   Authorized via Passkey / biometric
-   Using IOTA TS SDK

------------------------------------------------------------------------

## 2. Invisible Wallet UX

Users must NOT:

-   See hashes
-   See seed phrases
-   Install extensions
-   Manage crypto jargon

This is NOT a crypto wallet app.\
It is a legal-tech inheritance product.

------------------------------------------------------------------------

# Documentation Resources

When working on Expo-specific topics, always consult:

-   https://docs.expo.dev/llms-full.txt
-   https://docs.expo.dev/llms-sdk.txt
-   https://docs.expo.dev/llms-eas.txt
-   https://reactnative.dev/docs/getting-started

For IOTA integration:

-   Use official IOTA TS SDK documentation
-   Follow Move object architecture patterns
-   Do not assume browser APIs exist (React Native ≠ browser)

------------------------------------------------------------------------

# Project Structure

/ ├── app/\
├── src/\
│ ├── features/\
│ ├── components/\
│ │ └── shared/\
│ ├── iota/\
│ ├── libs/\
│ └── theme/\
├── app.json\
├── eas.json\
└── package.json

------------------------------------------------------------------------

# Component Rules

Before creating any new component:

1.  Check `src/components/shared/`
2.  Extend existing components when possible
3.  Only create new ones if reusable and logically independent

Never duplicate UI patterns unnecessarily.

------------------------------------------------------------------------

# Accessibility (MANDATORY)

All UI must include:

-   accessibilityLabel
-   accessibilityHint
-   accessibilityRole
-   Proper touch targets
-   No color-only meaning
    Please see `ACCESSIBILITY.md` in this same directory for the main project documentation ACCESIBILITY.


------------------------------------------------------------------------

# Internationalization (MANDATORY)

Use:

const { t } = useI18nService();

Never hardcode strings.

------------------------------------------------------------------------

# IOTA Layer Rules

## services/

-   Build transactions
-   No UI logic

## hooks/

-   Manage loading/error state
-   Call services

## UI

-   No blockchain logic inside components

------------------------------------------------------------------------

# Signing Architecture

-   Use IOTA TS SDK
-   Use local keypair
-   Authorize with Passkey / biometric
-   No dapp-kit popup wallet
-   No browser-only APIs

------------------------------------------------------------------------

# Multi-Device

-   Identity via Google/Apple
-   Device authorization via Passkey
-   Linking via QR
-   No backend custody

------------------------------------------------------------------------

# Code Standards

-   TypeScript strict
-   No any
-   Proper hook dependencies
-   Memoization when appropriate
-   Clean separation of concerns

------------------------------------------------------------------------

# Performance

-   No heavy logic in render
-   Avoid unnecessary re-renders
-   Keep architecture clean

------------------------------------------------------------------------

# Debugging

-   Remove console.log in production
-   Use error boundaries
-   Surface relevant errors to UI

------------------------------------------------------------------------

# EAS & Native Modules

-   Verify Expo SDK compatibility
-   Use `npx expo doctor`
-   Use `npx expo install --check`
-   Rebuild dev client after native changes

------------------------------------------------------------------------

# AI Agent Operating Principles

1.  Respect architecture
2.  Reuse shared components
3.  Maintain accessibility
4.  Maintain translations
5.  Maintain non-custodial design
6.  Maintain mobile-first UX
7.  Avoid unnecessary dependencies
8.  Do not redesign navigation without reason

------------------------------------------------------------------------

# What This Project Is

SmartLegacy is:

-   Legal-tech inheritance system
-   Built on IOTA Move
-   Seedless
-   Senior-friendly
-   Product-led

It is NOT:

-   A general-purpose wallet
-   A DeFi dashboard
-   A crypto trading app
