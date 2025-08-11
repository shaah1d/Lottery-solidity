export function shortAddress(addr?: string | null, left = 6, right = 4) {
  if (!addr) return ""
  if (addr.length <= left + right) return addr
  return `${addr.slice(0, left)}…${addr.slice(-right)}`
}
