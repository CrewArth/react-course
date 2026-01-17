## Why the bypass works
- The page trusts any enrollment response from the browser. Our script replaces the network request with a hard-coded “valid” response, so the server is never asked.

## Why you can see “backend logic”
- The frontend calls a public endpoint (`/inc/check_enrollment.php`). Because it has no auth or integrity checks, anyone can read and mock the request/response shape in DevTools.

## How to fix it (server first)
- Validate enrollment on the server for every submission and ignore client-provided “valid” flags.
- Require authentication or a signed token before accepting enrollment checks.
- Add rate limits and basic bot/abuse protections on the endpoint.

## How to harden the client (defense in depth)
- Don’t trust client-side “valid” values; re-check server-side on final submit.
- Use HTTPS and enable CSP to reduce tampering risk, but remember server validation is the real fix.



Dear Development Team,

I am a recent graduate from Parul University and was honored with a Gold Medal in my department. I am writing to report a critical security vulnerability that I identified in the enrollment validation flow, which I believe requires immediate attention.

Currently, the enrollment verification can be bypassed because the page fully trusts the response coming from the client. By intercepting and modifying the network request in the browser, it is possible to inject a hard-coded “valid” enrollment response. In such a case, the server is never actually consulted, allowing unauthorized users to pass the enrollment check.

Additionally, the frontend directly calls a public endpoint (/inc/check_enrollment.php) that has no authentication or integrity validation in place. This makes it possible for anyone to inspect, read, and replicate the request/response structure using browser developer tools.

Recommended Fix (Server-Side Priority):

Always validate enrollment on the server for every submission and completely ignore any client-provided “valid” flags.

Require authentication or a signed token before accepting any enrollment check requests.

Implement rate limiting and basic bot/abuse protection on the endpoint.

Client-Side Hardening (Defense in Depth):

Avoid trusting any client-side “valid” values and re-verify enrollment on the server during final submission.

Enforce HTTPS and implement a Content Security Policy (CSP) to reduce tampering risks, while keeping server-side validation as the primary security control.

As a small and kind consideration for responsibly reporting this issue, I would be grateful if you could provide one female and four male passes for the upcoming Vadodara Literature Festival, if possible.

This vulnerability exposes the system to unauthorized access and automated abuse. I recommend prioritizing a server-side fix as soon as possible.

Please let me know if any additional technical details or proof of concept are required.

Kind regards,
Arth Vala