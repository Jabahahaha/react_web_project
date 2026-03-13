import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import theme from "./theme"
import App from "./App"
import { FavoritesProvider } from "./context/FavoritesProvider"
import HomePage from "./pages/HomePage"
import GameDetailPage from "./pages/GameDetailPage"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FavoritesProvider>
          <BrowserRouter basename="/react_web_project">
            <Routes>
              <Route element={<App />}>
                <Route index element={<HomePage />} />
                <Route path="game/:id" element={<GameDetailPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </FavoritesProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
