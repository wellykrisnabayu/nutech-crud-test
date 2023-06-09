export function getEnv(name: string) {
  return process.env[name] ?? "";
}
