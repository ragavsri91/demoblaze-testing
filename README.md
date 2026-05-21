# Demoblaze Testing

This repository contains Playwright end-to-end tests for the Demoblaze demo site using a Page Object Model design.

## What is included

- `tests/demoblaze.spec.ts` — the main test suite
- `tests/page-objects/` — reusable page object classes
- `package.json` — scripts for local and CI execution
- `Dockerfile` — container image for test execution
- `.github/workflows/playwright.yml` — GitHub Actions workflow

## Run locally

1. Install dependencies:
   ```bash
   npm ci
   ```
2. Run the full suite:
   ```bash
   npm test
   ```
3. Run in CI-style mode:
   ```bash
   npm run test:ci
   ```
4. Show the HTML report:
   ```bash
   npm run show-report
   ```

## Docker

Build the container:
```bash
docker build -t demoblaze-playwright .
```

Run the tests:
```bash
docker run --rm demoblaze-playwright
```

## GitHub Actions

The existing workflow at `.github/workflows/playwright.yml` installs dependencies, installs browsers, and runs the test suite on push or pull request.

## Next steps before pushing

1. Confirm all tests pass locally.
2. Add any Argos/visual regression configuration if needed.
3. Commit the POM refactor and support files.
4. Push to GitHub and verify the workflow.
