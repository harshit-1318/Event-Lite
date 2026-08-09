type RateLimitStore = Map<string, { count: number; resetTime: number }>;

const store: RateLimitStore = new Map();

interface RateLimitOptions {
  intervalMs?: number; // Time window (default: 60,000ms = 1 min)
  maxRequests?: number; // Max requests per window (default: 30)
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): { allowed: boolean; remaining: number; resetInMs: number } {
  const { intervalMs = 60000, maxRequests = 30 } = options;
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now > entry.resetTime) {
    store.set(identifier, { count: 1, resetTime: now + intervalMs });
    return { allowed: true, remaining: maxRequests - 1, resetInMs: intervalMs };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetInMs: entry.resetTime - now };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetInMs: entry.resetTime - now,
  };
}
