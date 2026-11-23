import { clientEntry, type Handle } from 'remix/component'

// A nested component that uses handle.id to connect a label and its input, as its docs suggest.
function Field(handle: Handle<{ label: string }>) {
  return () => (
    <p>
      <label htmlFor={handle.id}>{handle.props.label}</label> <input id={handle.id} />
    </p>
  )
}

export const SizeField = clientEntry(import.meta.url, function SizeField(handle: Handle) {
  return () => (
    <div data-entry-id={handle.id}>
      <Field label="Size" />
    </div>
  )
})
