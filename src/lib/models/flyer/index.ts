import type { FlyerPosition, FlyerType } from "vergins";

export function decodeFlyerPosition(position: string): FlyerPosition {
  switch (position) {
    case "top-right":
      return "top-right";
    case "bottom-right":
      return "bottom-right";
    case "top-left":
      return "top-left";
    case "bottom-left":
      return "bottom-left";
    default:
      return "bottom-right";
  }
}

export function decodeFlyerType(type: string): FlyerType {
  switch (type) {
    case "summary":
      return "summary";
    case "alert":
      return "alert";
    case "warning":
      return "warning";
    case "success":
      return "success";
    case "custom":
      return "custom";
    default:
      return "summary";
  }
}
