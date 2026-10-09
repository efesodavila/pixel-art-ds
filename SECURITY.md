# Security Policy

## Supported versions

| Version | Supported |
|---------|-----------|
| 1.x.x   | ✅ Active support |
| < 1.0   | ❌ Not supported |

## Reporting a vulnerability

We take security seriously. If you discover a vulnerability:

1. **Do not** open a public GitHub issue.
2. Open a private security advisory in the GitHub repository. Do not disclose the issue publicly before a fix is available.
3. Include:
   - Affected version(s)
   - Reproduction steps
   - Impact assessment
   - Suggested fix (optional)

We aim to respond within **72 hours** and publish a fix within **14 days** for confirmed high-severity issues.

## Disclosure timeline

1. **Day 0** — Vulnerability reported privately
2. **Day 1–3** — Maintainer triage + acknowledgement
3. **Day 4–14** — Fix development + private testing
4. **Day 14+** — Coordinated public disclosure + CVE if applicable

## Scope

In-scope:
- Logic flaws in token generation / contrast engine
- XSS via component props
- Prototype pollution in helpers
- Supply chain (dependencies)

Out-of-scope:
- Issues in user code that consumes the library
- Vulnerabilities in third-party services (e.g., Google Fonts CDN)
- Self-XSS requiring privileged access

## Hall of fame

Reporters are credited in `CHANGELOG.md` and `SECURITY.md` (with permission).
