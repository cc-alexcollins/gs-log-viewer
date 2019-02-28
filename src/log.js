function renderLog(name, component) {
  if (exports.enabled) {
    console.log(name, ":", {
      props: component.props,
      state: component.state
    });
  }
}

exports.enabled = true;
exports.renderLog = renderLog;
