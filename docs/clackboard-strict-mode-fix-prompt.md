# Prompt — Fix clackboard's Strict Mode animateOnMount bug

You are working inside the `clackboard` package repo (the React split-flap display component published at https://www.npmjs.com/package/clackboard). Your job is to fix a React Strict Mode bug in the `FlapChar` component that causes `animateOnMount` to silently fail for every character whose mount delay is greater than zero.

## Symptom

When a consumer renders `<SplitFlap layout="board" animateOnMount />` inside a React Strict Mode application (the Next.js App Router default in dev), exactly one character animates on mount — the one whose stagger delay is zero — and every other character renders as a blank space forever. Switching the target later (via a prop change) works correctly; only the initial mount is broken.

## Root cause

In `FlapChar` the mount effect looks roughly like this (reading from the dist bundle):

```js
const ut = useRef(L ? null : dt)  // "last acted-on target" ref

useEffect(() => {
  if (w) return
  const A = b ? t || M[0] || " " : (t || " ").toUpperCase()
  if (A === ut.current) return   // bail if target unchanged
  ut.current = A                 // mutate BEFORE scheduling work
  if (mt) { rt(A); z.current = A; m?.(); return }
  const Y = Ft(z.current, A, M)
  if (!Y.length && B <= 0) { m?.(); return }
  const tt = B > 0 ? $t(z.current, B, M) : []
  E.current = [...tt, ...Y]
  const ee = setTimeout(Q, e)
  return () => clearTimeout(ee)
}, [t, e, Q, M, m, B, w, mt])
```

In React Strict Mode, development effects double-invoke:

1. **First effect run**: `ut.current === null` → passes the guard → `ut.current = target` → schedules `setTimeout(Q, delay)`.
2. **Cleanup**: `clearTimeout(ee)` cancels the pending cascade.
3. **Second effect run**: `ut.current === target` (persisted across the double-invoke because refs are not reset by cleanup) → **early returns without rescheduling**.

Result: every character's cascade is cancelled and never re-queued. Only char 0 (delay 0) occasionally fires its setTimeout callback in the microtask gap between first effect and cleanup, which is why you see exactly one letter animate.

The root problem is that `ut.current` is mutated in the body of the effect without being reset by cleanup, so the "guard" trips on the strict-mode re-run.

## Fix

Two acceptable approaches. Pick whichever is smaller.

### Option A: reset `ut.current` in cleanup

Track the previous value before mutating, and restore it if the cleanup runs before the cascade has actually finished its first flip. Only commit the new value once the cascade has demonstrably started (e.g., inside `Q` on its first successful invocation).

```js
useEffect(() => {
  if (w) return
  const A = b ? t || M[0] || " " : (t || " ").toUpperCase()
  if (A === ut.current) return
  const prev = ut.current
  ut.current = A
  let cascadeStarted = false
  // ... schedule setTimeout(() => { cascadeStarted = true; Q(); }, e)
  return () => {
    clearTimeout(ee)
    if (!cascadeStarted) ut.current = prev
  }
}, [...])
```

### Option B (recommended): track target in state instead of a ref

Replace `const ut = useRef(...)` with `const [lastTarget, setLastTarget] = useState(L ? null : dt)`. State updates obey React's commit/rollback semantics — a strict-mode double-invoke that cancels its own effect won't leave the committed state ahead of reality, because the cleanup rolls it back naturally. Move the `setLastTarget(A)` call to fire inside the `setTimeout` callback (i.e., only after the cascade actually begins), so a cancelled schedule leaves `lastTarget` unchanged and the strict-mode re-run detects `A !== lastTarget` and reschedules.

## Acceptance test

1. Render `<SplitFlap layout="board" animateOnMount rows={[...]} />` inside `<React.StrictMode>` in a fresh component.
2. Observe that every character cascades from the initial charset first-character (usually space) to its target in the expected stagger order.
3. Confirm no characters are stuck at blank.
4. Run the package tests (`pnpm test` / `npm test`) and confirm nothing regresses.
5. Verify the same component still behaves correctly *without* Strict Mode (production builds).

## Constraints

- Do not break the public API (`SplitFlap` / `FlapChar` props).
- Do not add new runtime dependencies — clackboard's zero-deps guarantee is a core selling point.
- Bump the patch version in `package.json` once the fix lands.
- Add a brief entry to the CHANGELOG noting the Strict Mode fix.

## Report

Report in under 200 words: what the actual root cause was (in your own words), which option you chose, and the files you touched.

---

**Consumer note:** Once this fix ships upstream, the consumer site at `zvarney.com` can re-enable React Strict Mode by deleting the `reactStrictMode: false` line in `next.config.mjs`.
