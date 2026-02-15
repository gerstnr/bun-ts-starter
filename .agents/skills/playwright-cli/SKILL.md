---
name: playwright-cli
description: Browser debugging and visual verification using Playwright CLI. Use when needing to take screenshots, verify a page loads correctly, debug visual issues, check localhost web apps, or inspect UI rendered by dev servers.
---

# Playwright CLI

Use Playwright's CLI to visually verify web pages, take screenshots, and debug UI issues — all from the terminal without writing test files. For complex interactions (click, scroll, type), use inline Playwright scripts.

For the full flag/option reference, see [REFERENCE.md](./REFERENCE.md).

## Prerequisites

Installed as a dev dependency with Chromium browser:

```sh
bun add -d playwright
npx playwright install chromium
```

## Quick reference

| Task | Command |
|------|---------|
| Screenshot | `npx playwright screenshot <url> <file>` |
| Full-page screenshot | `npx playwright screenshot --full-page <url> <file>` |
| Wait for element | `npx playwright screenshot --wait-for-selector ".loaded" <url> <file>` |
| Wait timeout | `npx playwright screenshot --wait-for-timeout 3000 <url> <file>` |
| Mobile device | `npx playwright screenshot --device "iPhone 14" <url> <file>` |
| Custom viewport | `npx playwright screenshot --viewport-size "1080,1920" <url> <file>` |
| Dark mode | `npx playwright screenshot --color-scheme dark <url> <file>` |
| Save as PDF | `npx playwright pdf <url> <file>` |
| Open interactive | `npx playwright open <url>` |
| Record interactions | `npx playwright codegen <url>` |

## Typical workflow

1. Start the dev server (check `package.json` scripts for the right command)
2. Take a screenshot to verify:

```sh
npx playwright screenshot --wait-for-timeout 3000 http://localhost:3000 .agents/.tmp/screenshot.png
```

3. Read the screenshot image to inspect the result
4. If something looks wrong, iterate on the code and re-screenshot

## Advanced: interaction scripts

The CLI `screenshot` command cannot click, scroll, or type. For interactions, write a short inline script using Playwright as a library.

> **Important**: Use `node` (not `bun`) for Playwright scripts — Bun has known compatibility issues with `chromium.launch()`.

### Click an element, then screenshot

```sh
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.locator('button.play').click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '.agents/.tmp/after-click.png' });
  await browser.close();
})();
"
```

### Scroll, then screenshot

```sh
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.evaluate(() => window.scrollBy(0, 800));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '.agents/.tmp/scrolled.png' });
  await browser.close();
})();
"
```

### Screenshot a specific element

```sh
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.locator('.video-preview').screenshot({ path: '.agents/.tmp/element.png' });
  await browser.close();
})();
"
```

### Fill a form and submit

```sh
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.locator('#search').fill('test query');
  await page.locator('button[type=submit]').click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '.agents/.tmp/search-results.png' });
  await browser.close();
})();
"
```

### Custom viewport + device emulation in scripts

```sh
node -e "
const { chromium, devices } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ ...devices['iPhone 14'] });
  const page = await context.newPage();
  await page.goto('http://localhost:3000');
  await page.screenshot({ path: '.agents/.tmp/mobile.png' });
  await browser.close();
})();
"
```

## Mobile device interactions

The CLI `--device` flag emulates viewport, user agent, and pixel ratio, but **not touch**. For touch-enabled mobile testing, use scripts with `hasTouch: true`.

### Mobile context with touch (tap, swipe)

```sh
node -e "
const { chromium, devices } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...devices['iPhone 14'],
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto('http://localhost:3000');

  // Tap an element (touch equivalent of click)
  await page.tap('#menu-button');
  await page.waitForTimeout(500);
  await page.screenshot({ path: '.agents/.tmp/after-tap.png' });
  await browser.close();
})();
"
```

### Key differences from desktop

| Aspect | Desktop | Mobile (`hasTouch: true`) |
|--------|---------|--------------------------|
| Click | `page.click()` / `page.mouse.click()` | `page.tap()` / `page.touchscreen.tap()` |
| Scroll | `page.mouse.wheel(dx, dy)` | Swipe via `dispatchEvent('touchmove', ...)` |
| Hover | `page.hover()` works | No hover on touch devices — hover-dependent UI won't trigger |
| Pinch/zoom | N/A | Manual `dispatchEvent` with two touch points |

### Swipe gesture (pan)

```sh
node -e "
const { chromium, devices } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ ...devices['Pixel 7'], hasTouch: true });
  const page = await context.newPage();
  await page.goto('http://localhost:3000');

  // Swipe up on an element
  const el = page.locator('.scrollable');
  const box = await el.boundingBox();
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  const touches = [{ identifier: 0, clientX: cx, clientY: cy }];
  await el.dispatchEvent('touchstart', { touches, changedTouches: touches, targetTouches: touches });
  for (let i = 1; i <= 5; i++) {
    const moved = [{ identifier: 0, clientX: cx, clientY: cy - i * 60 }];
    await el.dispatchEvent('touchmove', { touches: moved, changedTouches: moved, targetTouches: moved });
  }
  await el.dispatchEvent('touchend', { touches: [], changedTouches: [], targetTouches: [] });

  await page.waitForTimeout(500);
  await page.screenshot({ path: '.agents/.tmp/after-swipe.png' });
  await browser.close();
})();
"
```

> **Note**: `page.tap()` requires `hasTouch: true` in the browser context — it will throw otherwise. The `Touchscreen` class natively supports only tap; swipe, pinch, and other multi-touch gestures require manual `dispatchEvent` calls with touch point coordinates. See [REFERENCE.md](./REFERENCE.md) for the full touch API.

## Capturing browser console output

Essential for debugging. Attach a `console` event listener **before** navigating — otherwise you miss logs emitted during page load.

### Print all console messages

```sh
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Attach BEFORE navigating
  page.on('console', msg => {
    console.log(\`[\${msg.type()}] \${msg.text()}\`);
  });

  await page.goto('http://localhost:3000');
  await page.waitForTimeout(3000);
  await browser.close();
})();
"
```

### Filter errors and warnings only

```sh
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    if (['error', 'warning'].includes(msg.type())) {
      console.log(\`[\${msg.type().toUpperCase()}] \${msg.text()}\`);
      const loc = msg.location();
      if (loc.url) console.log(\`  at \${loc.url}:\${loc.lineNumber}\`);
    }
  });

  // Also capture uncaught page errors
  page.on('pageerror', err => {
    console.error('[PAGE ERROR]', err.message);
  });

  await page.goto('http://localhost:3000');
  await page.waitForTimeout(3000);
  await browser.close();
})();
"
```

### Collect logs and screenshot together

```sh
node -e "
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const logs = [];

  page.on('console', msg => {
    logs.push({ type: msg.type(), text: msg.text() });
  });
  page.on('pageerror', err => {
    logs.push({ type: 'pageerror', text: err.message });
  });

  await page.goto('http://localhost:3000');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '.agents/.tmp/debug.png' });

  console.log(JSON.stringify(logs, null, 2));
  await browser.close();
})();
"
```

### Console message properties

| Property | Description |
|----------|-------------|
| `msg.type()` | Log level: `'log'`, `'error'`, `'warning'`, `'info'`, `'debug'`, `'trace'` |
| `msg.text()` | Full message text |
| `msg.args()` | Array of JSHandle arguments (use `await arg.jsonValue()` to extract) |
| `msg.location()` | Source location: `{ url, lineNumber, columnNumber }` |

### Page-level error events

| Event | Description |
|-------|-------------|
| `page.on('console', fn)` | All `console.*` calls from the browser |
| `page.on('pageerror', fn)` | Uncaught exceptions and unhandled promise rejections |
| `page.on('requestfailed', fn)` | Failed network requests (useful for missing assets) |

## Common Playwright API methods (for scripts)

| Method | What it does |
|--------|-------------|
| `page.goto(url)` | Navigate to URL |
| `page.screenshot({ path })` | Screenshot the page |
| `page.locator(sel).screenshot({ path })` | Screenshot a single element |
| `page.locator(sel).click()` | Click an element |
| `page.locator(sel).dblclick()` | Double-click an element |
| `page.locator(sel).hover()` | Hover over an element |
| `page.locator(sel).fill(text)` | Clear and type into an input |
| `page.locator(sel).type(text)` | Type into an input (key by key) |
| `page.locator(sel).press('Enter')` | Press a keyboard key |
| `page.locator(sel).selectOption('value')` | Select a dropdown option |
| `page.locator(sel).check()` / `.uncheck()` | Toggle a checkbox |
| `page.locator(sel).scrollIntoViewIfNeeded()` | Scroll element into view |
| `page.evaluate(fn)` | Run JS in the browser context |
| `page.mouse.move(x, y)` | Move mouse to coordinates |
| `page.mouse.click(x, y)` | Click at coordinates |
| `page.mouse.wheel(dx, dy)` | Scroll by delta |
| `page.keyboard.press('ArrowDown')` | Press a key |
| `page.keyboard.type('hello')` | Type a string |
| `page.waitForTimeout(ms)` | Wait for a fixed time |
| `page.waitForSelector(sel)` | Wait for element to appear |
| `page.waitForLoadState('networkidle')` | Wait for network to settle |

## Tips

- Always use `--wait-for-timeout` when the page has async loading (Studio, SPAs)
- Screenshots go to the workspace root by default — use `.agents/.tmp/` to avoid committing them
- The `--device` flag is useful for testing responsive layouts (e.g., YouTube Shorts at 9:16)
- Chromium is the default browser; use `-b firefox` or `-b webkit` if needed
- Runs headless by default — no display needed
- Use `--viewport-size "1080,1920"` for custom dimensions (e.g., vertical video)
- Use `--save-har <file>` to capture network activity for debugging API calls
- Use `--ignore-https-errors` for self-signed certs in development
- For authenticated pages, use `--save-storage` / `--load-storage` to persist and reuse session state
- For interaction scripts, always use `node` not `bun` (Bun has compatibility issues with `chromium.launch()`)
