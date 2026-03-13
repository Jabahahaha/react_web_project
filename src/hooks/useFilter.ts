import { useContext } from "react"
import { FilterContext } from "../context/FilterContext"
import type { FilterState } from "../context/FilterContext"

export function useFilter(): FilterState {
  const ctx = useContext(FilterContext)
  if (!ctx) throw new Error("useFilter must be used within FilterProvider")
  return ctx
}
