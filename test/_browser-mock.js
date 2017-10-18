import browserEnv from "browser-env";

browserEnv(["document"]);

const deadline = {
  timeRemaining: () => 1000
};

global["requestIdleCallback"] = function requestIdleCallback(fn) {
  fn(deadline);
};
