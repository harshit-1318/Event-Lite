import { describe, it, expect } from "vitest";
import { NAV_LINKS, APP_NAME, CATEGORIES } from "@/lib/constants";

describe("Constants & Site Config", () => {
  it("defines main navigation links correctly", () => {
    expect(NAV_LINKS.length).toBeGreaterThan(0);
    const eventLink = NAV_LINKS.find((l) => l.href === "/events");
    expect(eventLink).toBeDefined();
    expect(eventLink?.name).toBe("Events");
  });

  it("has valid app name configuration", () => {
    expect(APP_NAME).toBe("EventElite");
  });

  it("lists valid event categories", () => {
    expect(CATEGORIES.length).toBeGreaterThanOrEqual(4);
    const slugs = CATEGORIES.map((c) => c.slug);
    expect(slugs).toContain("workshops");
    expect(slugs).toContain("cultural-events");
  });
});
