import { describe, it, expect } from "vitest"
import theme from "./theme"

describe("theme", () => {
  it("uses dark mode", () => {
    expect(theme.palette.mode).toBe("dark")
  })

  it("has custom primary color", () => {
    expect(theme.palette.primary.main).toBe("#4fc3f7")
  })

  it("has custom border radius", () => {
    expect(theme.shape.borderRadius).toBe(8)
  })
})
