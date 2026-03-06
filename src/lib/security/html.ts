const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const HTML_ESCAPE_PATTERN = /[&<>"']/g;

export function escapeHtml(value: string): string {
  return value.replace(HTML_ESCAPE_PATTERN, (character) => {
    return HTML_ESCAPE_MAP[character] ?? character;
  });
}
