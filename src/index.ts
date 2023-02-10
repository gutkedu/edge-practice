import { Redis } from "@upstash/redis/cloudflare";

const redis = new Redis({
  url: "",
  token: "",
});

export interface Env {}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const { pathname } = new URL(request.url);

    switch (pathname) {
      case "/write": {
        const count = await redis.incr("count");

        return new Response(JSON.stringify({ count }), {
          headers: { "Content-Type": "application/json" },
        });
      }
      case "/read": {
        const count = await redis.get("count");

        return new Response(JSON.stringify({ count }), {
          headers: { "Content-Type": "application/json" },
        });
      }
      default: {
        return new Response(null, { status: 404 });
      }
    }
  },
};
