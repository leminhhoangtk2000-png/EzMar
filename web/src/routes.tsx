import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout";
import { Dashboard } from "./pages/Dashboard";
import { DeepDive } from "./pages/DeepDive";
import { BrandPlan } from "./pages/BrandPlan";
import { ThinkBox } from "./pages/ThinkBox";
import { TargetProfile } from "./pages/TargetProfile";
import { BrandPositioning } from "./pages/BrandPositioning";
import { BrandIdea } from "./pages/BrandIdea";
import { UIKit } from "./pages/UIKit";

// Current Brand Keys pages (mirror Brand Setup Canvas sections)
import { BrandKeyBasicIdentity } from "./pages/BrandKeyBasicIdentity";
import { BrandKeyCoreStrength } from "./pages/BrandKeyCoreStrength";
import { BrandKeyCompetitors } from "./pages/BrandKeyCompetitors";
import { BrandKeyTargetCustomer } from "./pages/BrandKeyTargetCustomer";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      // Overview Dashboard
      { index: true, Component: Dashboard },

      // ── Current Status → Current Brand Keys ──────────────────
      { path: "current-status/basic-identity",   Component: BrandKeyBasicIdentity },
      { path: "current-status/core-strength",    Component: BrandKeyCoreStrength },
      { path: "current-status/key-competitors",  Component: BrandKeyCompetitors },
      { path: "current-status/target-customer",  Component: BrandKeyTargetCustomer },

      // ── Legacy planning routes (used by Strategy module) ─────
      { path: "planning/deep-dive",        Component: DeepDive },
      { path: "planning/thinkbox",         Component: ThinkBox },
      { path: "planning/target-profile",   Component: TargetProfile },
      { path: "planning/brand-positioning",Component: BrandPositioning },
      { path: "planning/brand-idea",       Component: BrandIdea },
      { path: "planning/brand-plan",       Component: BrandPlan },

      // ── Dev / UI ─────────────────────────────────────────────
      { path: "uikit", Component: UIKit },
    ],
  },
]);
