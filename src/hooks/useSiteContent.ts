import { useEffect, useState } from 'react';
import { storeApi } from '../api/storeApi';
import { CONTENT_SCHEMA } from '../data/siteContent';

const defaultsByKey: Record<string, string> = Object.fromEntries(
  CONTENT_SCHEMA.map((f) => [f.key, f.default])
);

let cachedContent: Record<string, string> | null = null;
let inFlight: Promise<Record<string, string>> | null = null;

async function loadContent(): Promise<Record<string, string>> {
  if (cachedContent) return cachedContent;
  if (!inFlight) {
    inFlight = storeApi.getContent().then((data) => {
      cachedContent = data;
      return data;
    });
  }
  return inFlight;
}

/**
 * Returns a `get(key)` function that resolves an admin-edited override for
 * `key`, falling back to the hardcoded default defined in
 * `data/siteContent.ts` if no override exists (or while still loading).
 */
export function useSiteContent() {
  const [content, setContent] = useState<Record<string, string>>(cachedContent || {});

  useEffect(() => {
    let active = true;
    loadContent().then((data) => {
      if (active) setContent(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const get = (key: string): string => {
    const override = content[key];
    if (override !== undefined && override !== '') return override;
    return defaultsByKey[key] ?? '';
  };

  return { get, content };
}
