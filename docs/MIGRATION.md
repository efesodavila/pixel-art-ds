# Migration guide

This document tracks breaking changes and how to migrate.

## 0.x → 1.0

This is the first stable release. There is no 0.x to migrate from.

## Future migrations

When a breaking change ships, this file will gain a section:

```
## 1.x → 2.0

### Removed
- `<PixelOldComponent>` — replaced by `<PixelNewComponent>`

### Changed
- Token `oldName` renamed to `newName`

### Codemod
\`\`\`bash
npx @pixel-art-ds/codemod v1-to-v2 src/
\`\`\`
```

## Versioning policy

We follow [Semantic Versioning](https://semver.org):

- **PATCH** (`1.0.x`) — bug fixes, no API changes
- **MINOR** (`1.x.0`) — additive: new components, new tokens, new options
- **MAJOR** (`x.0.0`) — breaking: removed APIs, renamed tokens, changed defaults

Deprecations are announced one MINOR before removal, with a console warning in development.
