<div align="center">
  <img src="public/logo.png" alt="AinzStack Logo" width="64" />
  <br />
  <h1>Security Policy</h1>
</div>

<p align="center">
  <strong>Vulnerability reporting and security guarantees for AinzStack.</strong>
</p>

---

## Supported Versions

Currently, only the `main` branch and the latest minor release receive active security updates. We strongly encourage all developers to pull from the latest commits to ensure maximum architectural safety.

| Version | Supported | Notes                                   |
| :------ | :-------- | :-------------------------------------- |
| `0.1.x` | ✅ Yes    | Current active development branch.      |
| `< 0.1` | ❌ No     | Prototype and pre-release architecture. |

## Reporting a Vulnerability

Security is a foundational tenet of the AinzStack architecture. We take all vulnerabilities in our code, dependencies, and infrastructure exceptionally seriously.

If you discover a security vulnerability within AinzStack, please do **not** disclose it publicly via GitHub Issues, Discussions, or social media.

### Process

1. **Private Disclosure**: Immediately email the repository owner or use the private GitHub Security Advisory system if available on the repository.
2. **Details Required**: Provide a clear description of the vulnerability, steps to reproduce, and the potential impact. If possible, include a Proof of Concept (PoC).
3. **Response**: We aim to acknowledge receipt of the vulnerability report within 48 hours and provide a preliminary assessment.
4. **Resolution**: If the vulnerability is verified, we will develop a patch and issue a security advisory. We will typically coordinate public disclosure with you after the patch is published.

## Best Practices for AinzStack Consumers

When deploying applications built upon AinzStack, developers are responsible for their localized security context:

- **Environment Variables**: Never expose `STRIPE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, or `RESEND_API_KEY` to the client. Ensure they do not map to `NEXT_PUBLIC_` prefixed variables.
- **Row Level Security (RLS)**: AinzStack utilizes Supabase. You **must** ensure RLS is strictly enforced on your database tables in production to restrict unauthenticated or unauthorized data access.
- **Middleware**: AinzStack protects dashboard routes via Next.js Middleware. Do not bypass or remove this without re-implementing strict session boundary checks.

---

<div align="center">
  <p>
    <a href="https://github.com/JCFcodex/AinzStack">Repository</a> •
    <a href="https://github.com/JCFcodex/AinzStack/security">Security Advisories</a>
  </p>
  <p>
    <em>Built by <a href="https://github.com/JCFcodex">JCFcodex</a></em>
  </p>
</div>
