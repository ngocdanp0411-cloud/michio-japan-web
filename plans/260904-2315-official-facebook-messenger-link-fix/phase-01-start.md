---
title: "Replace And Verify Official Links"
status: in-progress
---

# Replace And Verify Official Links

## Requirements

- Preserve existing CTA labels, layout, Zalo, hotline and unrelated social links.
- Update the shared Facebook and Messenger constants.
- Replace hardcoded policy-page contact URLs with `LINKS` references.
- Record the confirmed official Fanpage in `memory.md`.

## Implementation

1. Update `src/lib/links.ts` with the confirmed page handle.
2. Import `LINKS` in four policy pages and remove duplicated URLs.
3. Search for stale handles, run lint/build, inspect rendered CTA hrefs.
4. Review, commit, push and verify Vercel production.

## Todo

- [x] Update links and policy pages.
- [x] Update project memory.
- [x] Validate and review.
- [ ] Deploy and smoke-test production.
