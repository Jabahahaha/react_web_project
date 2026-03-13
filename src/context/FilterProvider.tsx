import { useState } from "react"
import type { ReactNode } from "react"
import type { GameStatus, Sport } from "../scoreboard"
import { FilterContext } from "./FilterContext"

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sport, setSport] = useState<Sport | "all">("all")
  const [status, setStatus] = useState<GameStatus | "all">("all")

  return (
    <FilterContext.Provider value={{ sport, status, setSport, setStatus }}>
      {children}
    </FilterContext.Provider>
  )
}
