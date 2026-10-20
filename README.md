# Mortgage Calculator

Use Node 22 or newer. The app uses Vite and Vitest, replacing the unsupported
Create React App dependency tree that could not resolve its security advisories.
The mortgage calculations and React UI are unchanged.

```sh
npm ci
npm start
npm test
npm run build
npm audit
```

The development server remains at http://localhost:3000. Production files still
write to `build/`, including the existing custom-domain CNAME. `npm run deploy`
retains the existing GitHub Pages deployment command; the security workflow only
builds and tests and does not deploy.


## Dependency security maintenance

The GitHub Pages helper is pinned to 6.1.1, whose older glob implementation avoids the unpatched braces chain in 6.3. The deploy command and build output remain the same; deployment is not run by the security workflow.

Use Node 24.12 or newer for the checked build. The committed lockfile audits clean,
and CI runs dependency auditing, available tests, and production builds without
deploying. Dependabot checks dependency versions weekly.
