---
title: "Mobile Navigation And Blog Title Bug Fix"
date: 2026-09-04
type: technical-journal
status: completed
tags: [mobile-navigation, blog, metadata, validation]
---

# Mobile Navigation And Blog Title Bug Fix

## Context

Mobile-first storefront had two visible regressions: key header links could sit outside the viewport, and some blog headings repeated `| Michio Japan` even though the root metadata template already adds the brand.

## What happened

- Root cause, navigation: one non-wrapping row combined `shrink-0` items with horizontal scrolling, hiding later actions on 360–390px screens.
- Fix: keep `ProductMenu`, Mua sỉ, Bài viết, and Liên hệ in the compact nav; show the full navigation only from the `lg` breakpoint.
- Root cause, titles: markdown H1 values flowed directly into `post.title`; polluted source titles therefore reached both the article H1 and metadata.
- Fix: strip only an exact trailing `| Michio Japan`, clean affected markdown titles/H1s, use unbranded page metadata, and let the root layout add one brand suffix.
- Prevention: blog validation now rejects the suffix in frontmatter titles or H1s, and the authoring guide documents the rule.
- Mobile article headings now use balanced text and a smaller base size to avoid oversized wrapping.

## Reflection

Centralizing exact suffix cleanup in the parser protects old content and every consumer, while source cleanup and validation stop the defect from returning. Review caught two boundary mistakes: restoring the full nav at `md` caused page-wide overflow from 768–997px, so the breakpoint moved to `lg`; suffix validation originally lived inside `ai_assisted`, so H1 extraction and rejection moved before that branch to cover every post.

## Decisions

- Compact navigation remains active below 1024px; desktop receives the full nav at 1024px and above.
- Brand text belongs to the root metadata template, never blog title/H1 content.
- Backward compatibility stays in the parser; validation enforces clean new content.
- Docs impact: minor—one durable blog-format rule added.

## Next

- Verification passed: lint, production build, and blog validation.
- Browser checks passed at 360, 390, 768, 997, 1024, and 1280px, including compact/full breakpoint behavior, ProductMenu access, clean blog H1s, and single-suffix document titles.
- Run the same 360/390px smoke check on the deployed site after push.
- AgentWiki publishing skipped: no obvious local CLI/config found; nothing installed or transmitted.
