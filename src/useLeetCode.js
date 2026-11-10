import { useEffect, useState } from "react";
import { leetcode } from "./data.js";

// LeetCode itself blocks browser requests from other sites, so we ask
// public community APIs. If none answer, the numbers in data.js are used.
const SOURCES = [
  {
    url: (u) => `https://alfa-leetcode-api.onrender.com/${u}/solved`,
    read: (d) => ({ easy: d.easySolved, medium: d.mediumSolved, hard: d.hardSolved }),
  },
  {
    url: (u) => `https://leetcode-stats-api.herokuapp.com/${u}`,
    read: (d) => ({ easy: d.easySolved, medium: d.mediumSolved, hard: d.hardSolved }),
  },
];

const valid = (n) => Number.isFinite(n) && n >= 0;

async function fetchWithTimeout(url, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

export default function useLeetCode() {
  const [stats, setStats] = useState({
    easy: leetcode.easy,
    medium: leetcode.medium,
    hard: leetcode.hard,
    live: false,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const src of SOURCES) {
        try {
          const d = src.read(await fetchWithTimeout(src.url(leetcode.username), 8000));
          const total = d.easy + d.medium + d.hard;
          const saved = leetcode.easy + leetcode.medium + leetcode.hard;
          // Only trust answers that look real and aren't lower than what we know.
          if ([d.easy, d.medium, d.hard].every(valid) && total >= saved) {
            if (!cancelled) setStats({ ...d, live: true });
            return;
          }
        } catch {
          /* try the next source */
        }
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return stats;
}
