import DefaultTheme from "vitepress/theme-without-fonts";
import {useData} from "vitepress";
import {watch} from "vue";
import PlotRender from "../../components/PlotRender.js";
import CustomLayout from "./CustomLayout.vue";
import VersionBadge from "./VersionBadge.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  Layout: CustomLayout,
  enhanceApp({app, router}) {
    Object.defineProperty(app.config.globalProperties, "$dark", {get: () => useData().isDark.value});
    app.component("PlotRender", PlotRender);
    app.component("VersionBadge", VersionBadge);
    enableAnalytics(router);
  }
};

function enableAnalytics(router) {
  if (typeof location === "undefined" || location.origin !== "https://observablehq.com") return;
  let pageLoaded = false;
  watch(router.route, async () => {
    const {pageLoad, routeChanged} = await import("https://events.observablehq.com/client.js");
    if (pageLoaded) {
      routeChanged();
    } else {
      pageLoad();
      pageLoaded = true;
    }
  });
}