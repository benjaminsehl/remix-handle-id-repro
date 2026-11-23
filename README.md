# Remix 3: `disabled: ""` is disabled on the server and enabled after hydration

A client entry spreads `{ disabled: '' }` onto a button. The server renders `disabled=""`, so the button is disabled. Once the page hydrates, the browser runtime sets `button.disabled = ''`, which is `false`, and the button becomes enabled. Nothing warns.

`""` for a present boolean attribute is common in untyped attribute objects, such as the slot attributes of headless UI libraries. The same happens with `hidden`, `inert`, `required`, `checked`, `open` and `selected`.

## Run it

```sh
npm i
npm run dev
```

1. Run `curl -s http://localhost:44100/ | grep sold-out`. The server HTML has `<button type="button" id="sold-out" disabled="">`.
2. Open `http://localhost:44100/` and run `document.getElementById('sold-out').disabled` in the console after the page loads.

- **Expected:** `true`, as in the server HTML.
- **Actual:** `false`. The button is enabled.

The whole app is `app/actions/controller.tsx` and `app/actions/public/sold-out-button.tsx`.
