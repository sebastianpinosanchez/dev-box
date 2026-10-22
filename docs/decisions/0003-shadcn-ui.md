# 0003 — CLI-generated Radix primitives

Accepted. Initialize via shadcn CLI, use CSS variables and the @ alias. The current CLI initially selected Base UI; components were regenerated via the CLI using the Radix new-york style required by the specification. Generated files are vendor code, not manually customized. Custom theme/layout lives outside ui/. Vendor hashes enforce this convention. The CLI currently emits the cn package import; retain the dependency it generated. Sonner uses a custom Vite theme wrapper via explicit theme props.
