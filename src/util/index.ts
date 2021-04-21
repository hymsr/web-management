export function isLocalEnv(): boolean {
  return window.location.host.startsWith('localhost');
}
