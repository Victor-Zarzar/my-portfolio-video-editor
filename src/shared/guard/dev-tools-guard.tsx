import { useDisableDevTools } from "#/hooks/use-disable-dev"

type DevToolsGuardProps = {
  unauthorizedPath?: string
}

export function DevToolsGuard({
  unauthorizedPath = "/unauthorized",
}: DevToolsGuardProps) {
  useDisableDevTools(unauthorizedPath)
  return null
}
