# Remix 3: a nested component's `handle.id` changes at hydration

`Handle.id` is documented as a "stable identifier per component instance. Useful for HTML APIs like htmlFor, aria-owns". The client entry's own `handle.id` survives hydration. A component nested inside it gets one id from the server and another in the browser, so every attribute built from it is rewritten when the page hydrates.

## Run it

```sh
npm i
npm run dev
```

1. Run `curl -s http://localhost:44100/ | grep -o '<label for="[^"]*"'`. The server renders an id such as `for="s040c2614-2"`.
2. Open `http://localhost:44100/` and, after it loads, run `document.querySelector('label').htmlFor` in the console.

- **Expected:** the id from the server HTML, as for the client entry's own id (`data-entry-id`), which survives hydration.
- **Actual:** `c1`. The label and input are re-rendered with a new id.

Anything that captured the server id before hydration, such as a script, a CSS `:target` or an ARIA reference from outside the entry, points at an element that no longer has it.

The whole app is `app/actions/controller.tsx` and `app/actions/public/size-field.tsx`.
