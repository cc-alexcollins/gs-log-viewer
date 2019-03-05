const Filter = ["Render"].reduce((all, f) => {
  all[f] = f;
  return all;
});

function renderLog(name, component) {
  if (exports.filters.includes(Filter.Render)) {
    console.log(name, ":", {
      props: component.props,
      state: component.state
    });
  }
}

exports.filters = [];
exports.renderLog = renderLog;
