import { 
  INDIAN_PHARMACY_DATABASE, 
  type IndianMedicineEntry 
} from '../data/indianPharmacyDatabase';

/**
 * Simulated Indian Pharmacy API Engine
 * 
 * Simulates real-world network latency (300ms) while querying an extensive
 * local database of Indian pharmaceutical trade brands and active salts.
 */
export async function fetchIndianMedicines(
  query: string,
  signal?: AbortSignal
): Promise<IndianMedicineEntry[]> {
  return new Promise((resolve, reject) => {
    // Listen for abort signal during the 300ms network delay
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleAbort = () => {
      if (timeoutId) clearTimeout(timeoutId);
      const abortErr = new Error('Indian Pharmacy API request was cancelled');
      abortErr.name = 'AbortError';
      reject(abortErr);
    };

    if (signal?.aborted) {
      handleAbort();
      return;
    }

    if (signal) {
      signal.addEventListener('abort', handleAbort, { once: true });
    }

    timeoutId = setTimeout(() => {
      if (signal) {
        signal.removeEventListener('abort', handleAbort);
      }

      const clean = query.trim().toLowerCase();

      if (!clean) {
        // Return curated popular Indian prescriptions on empty query
        resolve(INDIAN_PHARMACY_DATABASE.slice(0, 10));
        return;
      }

      // Filter Indian medications by brand name, generic salt, category, or clinical aliases
      const matches = INDIAN_PHARMACY_DATABASE.filter((med) => {
        const brandMatch = med.brandName.toLowerCase().includes(clean);
        const saltMatch = med.genericSalt.toLowerCase().includes(clean);
        const categoryMatch = med.category.toLowerCase().includes(clean);
        const aliasMatch = med.aliases.some((a) => a.toLowerCase().includes(clean));
        return brandMatch || saltMatch || categoryMatch || aliasMatch;
      });

      // Rank results: exact brand prefix first, then generic salt matches
      matches.sort((a, b) => {
        const aBrand = a.brandName.toLowerCase();
        const bBrand = b.brandName.toLowerCase();

        const aStarts = aBrand.startsWith(clean);
        const bStarts = bBrand.startsWith(clean);

        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        return aBrand.localeCompare(bBrand);
      });

      resolve(matches);
    }, 300); // 300ms simulated network latency
  });
}
