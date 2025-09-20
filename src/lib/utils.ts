import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to get the correct asset path for both local and GitHub Pages
export function getAssetPath(path: string): string {
  const base = import.meta.env.PROD ? "/zluri-assignment" : "";
  return `${base}${path}`;
}
