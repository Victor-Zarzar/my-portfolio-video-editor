import { useDisableDevTools } from "#/hooks/use-disable-dev"
import type { DevToolsGuardProps } from "../types/main"

export function DevToolsGuard({
  unauthorizedPath = "/unauthorized",
}: DevToolsGuardProps) {
  useDisableDevTools(unauthorizedPath)
  return null
}
