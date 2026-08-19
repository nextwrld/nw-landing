export function buildWhatsAppUrl(destination: string, message: string): string {
  const separator = destination.includes("?") ? "&" : "?";
  return `${destination}${separator}text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppMessage(
  base: string,
  context: { company?: string; operationArea?: string } = {}
): string {
  const parts = [base];
  if (context.operationArea && context.operationArea.trim()) {
    parts.push(context.operationArea.trim());
  }
  if (context.company && context.company.trim()) {
    parts.push(context.company.trim());
  }
  return parts.join(" · ");
}
