import { describe, it, expect } from "vitest";
import { formatCurrency, slugify, cn } from "@/lib/utils";

describe("Utility Functions", () => {
  it("formats Indian Rupees correctly", () => {
    expect(formatCurrency(0)).toBe("Free");
    expect(formatCurrency(250)).toContain("250");
  });

  it("generates url-safe slugs from event titles", () => {
    expect(slugify("TechVishwa Hackathon 2026!")).toBe("techvishwa-hackathon-2026");
    expect(slugify("  National Seminar & Research Symposium  ")).toBe("national-seminar-research-symposium");
  });

  it("merges tailwind class names properly", () => {
    expect(cn("bg-red-500", "p-4", false && "hidden")).toBe("bg-red-500 p-4");
  });
});
