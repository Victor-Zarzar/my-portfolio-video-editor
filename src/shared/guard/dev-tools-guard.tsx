import { useDisableDevTools } from "#/hooks/use-disable-dev"
import type { DevToolsGuardProps } from "#/shared/types/devtools/dev-tools"

export function DevToolsGuard({
  unauthorizedPath = "/unauthorized",
}: DevToolsGuardProps) {
  useDisableDevTools(unauthorizedPath)
  return null
}
