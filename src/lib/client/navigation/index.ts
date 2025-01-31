export function openInANewWindow(url: string) {
  window.open(url, "_blank")?.focus();
}
