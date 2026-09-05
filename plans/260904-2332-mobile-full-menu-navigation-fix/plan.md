---
title: "Mobile Full Menu Navigation Fix"
description: "Restore access to every main page below 1024px without bringing back horizontal overflow."
status: in-progress
priority: P1
effort: "1h"
tags: [bugfix, mobile, navigation]
created: 2026-09-04
---

# Mobile Full Menu Navigation Fix

## Overview

Turn the mobile hamburger into a full site menu: six primary destinations plus all eight product categories. Keep the compact outside bar and unchanged desktop navigation.

## Phase

| # | Phase | Status |
|---|-------|--------|
| 1 | [Restore Complete Mobile Navigation](./phase-01-restore-complete-mobile-navigation.md) | In progress |

## Success Criteria

- [x] Mobile MENU exposes all 6 primary links and 8 categories.
- [x] Popup scrolls independently on short screens; every item remains reachable.
- [x] Escape, outside click and selecting a link close the popup.
- [x] No document overflow at 360, 375, 390, 768 and 997px.
- [x] Desktop full navigation remains unchanged at 1024px and above.
- [ ] Lint, build, review and local/production browser checks pass.
