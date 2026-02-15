# Playwright CLI — Full Reference

Complete flag and option reference for all Playwright CLI commands. Generated from `npx playwright <command> --help`.

## Commands overview

| Command | Description |
|---------|-------------|
| `screenshot <url> <file>` | Capture a page screenshot |
| `pdf <url> <file>` | Save page as PDF |
| `open [url]` | Open page in browser for interactive debugging |
| `codegen [url]` | Open page and generate code for user actions |
| `cr [url]` / `ff [url]` / `wk [url]` | Open in Chromium / Firefox / WebKit |
| `install [browser...]` | Install browsers for this Playwright version |
| `install-deps [browser...]` | Install OS dependencies for browsers |
| `show-trace [trace]` | Open trace viewer |

---

## `npx playwright screenshot`

Capture a page screenshot.

```
npx playwright screenshot [options] <url> <filename>
```

### Screenshot-specific options

| Flag | Description |
|------|-------------|
| `--full-page` | Capture full scrollable area (not just viewport) |
| `--wait-for-selector <sel>` | Wait for a CSS selector to appear before capturing |
| `--wait-for-timeout <ms>` | Wait a fixed time (ms) before capturing |

### Shared browser options

These options are available on `screenshot`, `pdf`, `open`, and `codegen`:

| Flag | Description | Default |
|------|-------------|---------|
| `-b, --browser <type>` | Browser engine: `cr`/`chromium`, `ff`/`firefox`, `wk`/`webkit` | `chromium` |
| `--channel <channel>` | Chromium channel: `chrome`, `chrome-beta`, `msedge-dev`, etc. | — |
| `--device <name>` | Emulate a device (e.g., `"iPhone 14"`, `"Pixel 7"`) | — |
| `--viewport-size <size>` | Viewport in pixels, e.g., `"1280,720"` | — |
| `--color-scheme <scheme>` | `light` or `dark` | — |
| `--timezone <tz>` | Timezone emulation, e.g., `"Europe/Rome"` | — |
| `--geolocation <coords>` | Geolocation, e.g., `"37.819722,-122.478611"` | — |
| `--lang <locale>` | Language/locale, e.g., `"en-GB"`, `"de-DE"` | — |
| `--user-agent <ua>` | Custom user-agent string | — |
| `--ignore-https-errors` | Ignore HTTPS certificate errors | `false` |
| `--block-service-workers` | Block service workers | `false` |
| `--timeout <ms>` | Timeout for Playwright actions (0 = no timeout) | no timeout |
| `--proxy-server <proxy>` | Proxy server, e.g., `"http://myproxy:3128"` | — |
| `--proxy-bypass <domains>` | Comma-separated domains to bypass proxy | — |
| `--load-storage <file>` | Load browser storage state from file | — |
| `--save-storage <file>` | Save browser storage state to file after run | — |
| `--save-har <file>` | Save HAR (HTTP Archive) file with all network activity | — |
| `--save-har-glob <glob>` | Filter HAR entries by URL glob pattern | — |
| `--user-data-dir <dir>` | Use a persistent browser profile directory | — |

---

## `npx playwright pdf`

Save page as PDF. Chromium only.

```
npx playwright pdf [options] <url> <filename>
```

### PDF-specific options

| Flag | Description |
|------|-------------|
| `--paper-format <format>` | Paper format: `Letter`, `Legal`, `Tabloid`, `Ledger`, `A0`–`A6` |
| `--wait-for-selector <sel>` | Wait for a CSS selector before saving |
| `--wait-for-timeout <ms>` | Wait a fixed time (ms) before saving |

Plus all [shared browser options](#shared-browser-options).

---

## `npx playwright open`

Open page in an interactive browser window. Useful for manual inspection.

```
npx playwright open [options] [url]
```

All [shared browser options](#shared-browser-options) apply. No additional options.

---

## `npx playwright codegen`

Open page and generate code from recorded user interactions.

```
npx playwright codegen [options] [url]
```

### Codegen-specific options

| Flag | Description | Default |
|------|-------------|---------|
| `-o, --output <file>` | Save generated script to file | stdout |
| `--target <lang>` | Output language: `javascript`, `playwright-test`, `python`, `python-async`, `python-pytest`, `csharp`, `csharp-mstest`, `csharp-nunit`, `java`, `java-junit` | `playwright-test` |
| `--test-id-attribute <attr>` | Use custom attribute for test ID selectors | — |

Plus all [shared browser options](#shared-browser-options).

---

## `npx playwright show-trace`

Open the Playwright Trace Viewer to inspect recorded traces.

```
npx playwright show-trace [options] [trace]
```

| Flag | Description | Default |
|------|-------------|---------|
| `-b, --browser <type>` | Browser for the viewer | `chromium` |
| `-h, --host <host>` | Host to serve trace on (opens in browser tab) | — |
| `-p, --port <port>` | Port to serve trace on (0 = any free port) | — |
| `--stdin` | Accept trace URLs over stdin to update the viewer | — |

---

## `npx playwright install`

Install browsers for the current Playwright version.

```
npx playwright install [options] [browser...]
```

| Flag | Description |
|------|-------------|
| `--with-deps` | Also install OS-level dependencies |
| `--dry-run` | Show what would be installed |
| `--force` | Force reinstall |

Browser names: `chromium`, `firefox`, `webkit`, `ffmpeg`.

---

## Device names (subset)

Use with `--device "<name>"`. See the [full list](https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json).

**iPhone**: iPhone SE, iPhone 12, iPhone 12 Pro, iPhone 13, iPhone 13 Pro, iPhone 13 Pro Max, iPhone 14, iPhone 14 Pro, iPhone 14 Pro Max, iPhone 15, iPhone 15 Pro, iPhone 15 Pro Max

**iPad**: iPad Mini, iPad (gen 7), iPad Pro 11, iPad Pro 12.9 (landscape variants available)

**Android**: Pixel 5, Pixel 7, Galaxy S5, Galaxy S9+, Galaxy Note II, Moto G4, Nexus 5

**Desktop**: Desktop Chrome, Desktop Firefox, Desktop Safari, Desktop Edge

Most devices have landscape variants (append ` landscape`).

---

## Playwright script API — quick reference

For interactions beyond what the CLI offers (click, scroll, type, hover), use Playwright as a Node.js library. Run with `node` (not `bun` — compatibility issues with `chromium.launch()`).

### Page navigation & waiting

| Method | Description |
|--------|-------------|
| `page.goto(url, options?)` | Navigate to URL. Options: `{ waitUntil: 'load' \| 'domcontentloaded' \| 'networkidle' }` |
| `page.reload(options?)` | Reload the page |
| `page.goBack()` / `page.goForward()` | History navigation |
| `page.waitForTimeout(ms)` | Wait for a fixed time |
| `page.waitForSelector(sel, options?)` | Wait for element. Options: `{ state: 'visible' \| 'attached' \| 'hidden' }` |
| `page.waitForLoadState(state?)` | Wait for `'load'`, `'domcontentloaded'`, or `'networkidle'` |
| `page.waitForURL(url)` | Wait for navigation to a URL pattern |

### Screenshots

| Method | Description |
|--------|-------------|
| `page.screenshot({ path })` | Full viewport screenshot |
| `page.screenshot({ path, fullPage: true })` | Full scrollable page |
| `page.screenshot({ path, clip: { x, y, width, height } })` | Clip to a region |
| `page.locator(sel).screenshot({ path })` | Screenshot a single element |

### Mouse

| Method | Description |
|--------|-------------|
| `page.mouse.click(x, y, options?)` | Click at coordinates. Options: `{ button: 'left' \| 'right' \| 'middle', clickCount, delay }` |
| `page.mouse.dblclick(x, y)` | Double-click at coordinates |
| `page.mouse.move(x, y, options?)` | Move to coordinates. Options: `{ steps }` for smooth motion |
| `page.mouse.down(options?)` | Press mouse button |
| `page.mouse.up(options?)` | Release mouse button |
| `page.mouse.wheel(deltaX, deltaY)` | Scroll by delta pixels |

### Keyboard

| Method | Description |
|--------|-------------|
| `page.keyboard.press(key)` | Press and release a key (e.g., `'Enter'`, `'ArrowDown'`, `'Control+A'`) |
| `page.keyboard.type(text, options?)` | Type text character by character. Options: `{ delay }` |
| `page.keyboard.down(key)` / `.up(key)` | Hold/release a key |
| `page.keyboard.insertText(text)` | Insert text without key events |

### Locator interactions

| Method | Description |
|--------|-------------|
| `page.locator(sel).click(options?)` | Click element. Options: `{ force, position: { x, y }, modifiers: ['Shift'] }` |
| `page.locator(sel).dblclick()` | Double-click element |
| `page.locator(sel).hover(options?)` | Hover over element |
| `page.locator(sel).fill(text)` | Clear input and type new value |
| `page.locator(sel).type(text, options?)` | Type character by character |
| `page.locator(sel).press(key)` | Press key while element is focused |
| `page.locator(sel).selectOption(value)` | Select dropdown option (by value, label, or index) |
| `page.locator(sel).check()` / `.uncheck()` | Toggle checkbox/radio |
| `page.locator(sel).setInputFiles(paths)` | Upload files |
| `page.locator(sel).scrollIntoViewIfNeeded()` | Scroll element into viewport |
| `page.locator(sel).focus()` | Focus the element |
| `page.locator(sel).blur()` | Blur the element |
| `page.locator(sel).dragTo(target)` | Drag element to target locator |

### Touch / mobile

Requires `hasTouch: true` in the browser context. Device presets like `devices['iPhone 14']` set this automatically.

| Method | Description |
|--------|-------------|
| `page.tap(sel, options?)` | Tap an element (touch equivalent of click). Options: `{ position: { x, y } }` |
| `page.touchscreen.tap(x, y)` | Tap at viewport coordinates |
| `locator.dispatchEvent('touchstart', data)` | Dispatch a custom touch event (for swipe/pinch) |
| `locator.dispatchEvent('touchmove', data)` | Continue a touch gesture |
| `locator.dispatchEvent('touchend', data)` | End a touch gesture |

**Touch event data shape** (for `dispatchEvent`):

```js
{
  touches: [{ identifier: 0, clientX: x, clientY: y }],
  changedTouches: [{ identifier: 0, clientX: x, clientY: y }],
  targetTouches: [{ identifier: 0, clientX: x, clientY: y }],
}
```

For pinch gestures, use two touch points (different `identifier` values) and move them toward/away from each other in `touchmove` steps. See Playwright's [touch events (legacy)](https://playwright.dev/docs/touch-events) docs for full pan and pinch examples.

**Important**: `page.tap()` throws if `hasTouch` is not `true`. The native `Touchscreen` class only supports single-point tap — swipe, pinch, and multi-touch require manual `dispatchEvent` with `Touch` point data.

### Evaluation

| Method | Description |
|--------|-------------|
| `page.evaluate(fn, arg?)` | Run JS in browser, return result |
| `page.evaluateHandle(fn, arg?)` | Run JS, return handle to a browser object |
| `page.locator(sel).evaluate(fn, arg?)` | Run JS with the element as first argument |

### Console & page events

Attach listeners **before** `page.goto()` to capture logs emitted during page load.

| Event | Callback argument | Description |
|-------|-------------------|-------------|
| `page.on('console', fn)` | `ConsoleMessage` | Fires on every `console.*` call in the browser |
| `page.on('pageerror', fn)` | `Error` | Uncaught exceptions and unhandled rejections |
| `page.on('requestfailed', fn)` | `Request` | Failed network requests (missing assets, CORS errors) |
| `page.on('response', fn)` | `Response` | Every HTTP response (useful for status code checks) |
| `page.on('load', fn)` | — | Page `load` event fired |
| `page.on('domcontentloaded', fn)` | — | DOM ready |

**ConsoleMessage properties:**

| Property | Description |
|----------|-------------|
| `msg.type()` | `'log'`, `'error'`, `'warning'`, `'info'`, `'debug'`, `'trace'`, `'assert'` |
| `msg.text()` | Full message text |
| `msg.args()` | Array of `JSHandle` — use `await arg.jsonValue()` to extract values |
| `msg.location()` | `{ url, lineNumber, columnNumber }` — source location in the page |

**Request properties (for `requestfailed`):**

| Property | Description |
|----------|-------------|
| `request.url()` | The URL that failed |
| `request.failure()` | `{ errorText }` — reason for the failure |
| `request.resourceType()` | `'document'`, `'stylesheet'`, `'image'`, `'script'`, `'fetch'`, etc. |

### Browser context

| Method | Description |
|--------|-------------|
| `browser.newContext(options?)` | Create context with viewport, device, locale, permissions, etc. |
| `context.newPage()` | Open a new page/tab |
| `context.storageState({ path })` | Save cookies/localStorage to file |
| `browser.newContext({ storageState: 'auth.json' })` | Restore saved session |
