<div align="center">
  <img src="public/logo.png" alt="AinzStack Logo" width="64" />
  <br />
  <h1>Contributing to AinzStack</h1>
</div>

<p align="center">
  <strong>Engineering rigor and clear communication form the basis of our collaboration.</strong><br/>
  <em>Thank you for dedicating your time to improving AinzStack.</em>
</p>

---

## The Development Process

To maintain architectural integrity and codebase quality, all contributions must adhere to the following workflow:

### 1. Environment Setup

Fork the repository and clone your fork locally. Ensure you meet the system prerequisites outlined in the `README.md` (Node.js v22+, pnpm v10+).

```bash
git clone https://github.com/[YOUR_USERNAME]/AinzStack.git
cd AinzStack
pnpm install
```

### 2. Branching Strategy

Never commit directly to the `main` branch. Create a feature branch scoped to the specific issue or feature you are addressing.

```bash
git checkout -b feature/brief-description
# or
git checkout -b fix/issue-description
```

### 3. Making Changes

When modifying the codebase, adhere to these principles:

- **Consistency**: Match the existing architectural patterns (Next.js App Router conventions, Tailwind structure).
- **TypeScript**: Rely on strict typing. Avoid `any` types.
- **Modularity**: Keep UI components isolated within `src/components/ui/` or `src/components/shared/` where applicable.

### 4. Validation

Before staging your changes, ensure they pass the overarching quality control suite. Our Continuous Integration checks require zero errors.

Run the validation suite locally:

```bash
pnpm ci
```

Alternatively, run specific checks if you are isolating a failure:

| Command          | Target                          |
| :--------------- | :------------------------------ |
| `pnpm lint`      | Static code analysis            |
| `pnpm typecheck` | TypeScript compiler validation  |
| `pnpm test`      | Unit testing (Vitest)           |
| `pnpm test:e2e`  | End-to-end testing (Playwright) |

### 5. Committing Guidelines

We adhere strictly to [Conventional Commits](https://www.conventionalcommits.org/). This standard dictates the semantic versioning and changelog generation of the project.

**Format:**

```text
<type>(<optional scope>): <description>
```

**Permitted Types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

**Example:**

```bash
git commit -m "feat(auth): integrate multi-factor authentication layer"
```

### 6. Pull Requests

Push to your fork and submit a Pull Request to the `main` branch of the upstream repository.

- Keep the PR highly scoped. Giant monolithic PRs are difficult to review and prone to rejection.
- Fill out the PR template accurately.
- Ensure the CI pipeline is passing (green checkmark).

## Project Structure Reference

When integrating new logic, please respect the established boundaries:

- `src/app/api/`: Edge and serverless routes. Do not place business logic directly in generic UI files.
- `src/lib/`: External service intialization (Supabase clients, Stripe configuration).
- `src/actions/`: Next.js Server Actions intended for form submissions and data mutation.

---

<div align="center">
  <p>
    <a href="https://github.com/JCFcodex/AinzStack">Repository</a> •
    <a href="https://github.com/JCFcodex/AinzStack/issues">Issue Tracker</a>
  </p>
  <p>
    <em>Built by <a href="https://github.com/JCFcodex">JCFcodex</a> and Contributors</em>
  </p>
</div>
