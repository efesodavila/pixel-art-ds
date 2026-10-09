# Governance

This document describes how decisions are made in Pixel Art DS.

## Roles

### Contributor
Anyone who opens an issue, PR, or participates in discussions.

### Maintainer
Has merge rights. Reviews PRs, triages issues, cuts releases. Listed in `CODEOWNERS`.

### Lead maintainer
Resolves ties, owns the roadmap, manages publishing credentials.

## Decision-making

- **Lazy consensus** for small changes: no objections within 72 hours = approved.
- **Two-maintainer review** required for new components, breaking changes, and token edits.
- **Public RFC** (issue tagged `rfc`) required for architectural changes (new layer, new platform, new naming).

## Roadmap

The roadmap lives in `CHANGELOG.md` under `[Unreleased]` and in GitHub Milestones. Anyone can propose; the lead maintainer arbitrates priorities.

## Releases

- Follow [Semantic Versioning](https://semver.org).
- Cut from `main` after CI passes.
- Tagged with `v1.2.3`; release notes auto-generated from Conventional Commits + curated.
- NPM publish requires lead maintainer.

## Becoming a maintainer

After 5+ merged PRs of meaningful contribution, a contributor may be nominated. Existing maintainers vote; majority + lead approval grants the role.

## Stepping down

Maintainers may step down anytime. Their write access is revoked; their work remains.

## Disputes

Disagreements are resolved by:
1. Discussion in the issue/PR
2. Maintainer vote
3. Lead maintainer decision (final)
