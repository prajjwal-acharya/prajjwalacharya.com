type JsonLdProps = {
  data: object | object[];
};

/**
 * Renders one or more schema.org objects (from `lib/json-ld.ts`) as
 * `<script type="application/ld+json">` tags — the standard way to embed
 * structured data with the App Router (there's no Metadata API equivalent
 * for JSON-LD the way there is for OpenGraph/Twitter). `<` is escaped so
 * a title/description containing `</script>` can't break out of the tag.
 */
export function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
