"use client";

import { Provider } from "react-redux";
import { store } from "../app/store"; // Upewnij się, że ścieżka jest poprawna

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
