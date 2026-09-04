---
title: "Official Facebook Messenger Link Fix"
description: "Replace the wrong Japon Store Facebook/Messenger handle with the official Michio Japan page and remove duplicated policy-page URLs."
status: in-progress
priority: P1
effort: "30m"
tags: [bugfix, contact, cta]
created: 2026-09-04
---

# Official Facebook Messenger Link Fix

## Overview

Use the confirmed Facebook page `MichioJapanGroup` everywhere. Route all policy-page contact links through the shared `LINKS` object so this cannot drift again.

## Phase

| # | Phase | Status |
|---|-------|--------|
| 1 | [Replace And Verify Official Links](./phase-01-start.md) | In progress |

## Success Criteria

- [x] The stale page handle no longer exists in repository contact links.
- [x] Facebook uses `https://www.facebook.com/MichioJapanGroup`.
- [x] Inbox uses `https://m.me/MichioJapanGroup`.
- [x] Shared CTA consumers and policy pages resolve to the official links.
- [ ] Lint, build, browser smoke check, review and production deploy pass.
