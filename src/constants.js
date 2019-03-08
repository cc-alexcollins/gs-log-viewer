const LogLevels = {
  Debug: "Debug",
  Error: "Error",
  Exception: "Exception"
};

const GSLogLevels = {
  [LogLevels.Debug]: "DEBUG",
  [LogLevels.Error]: "ERROR",
  [LogLevels.Exception]: "ERROR"
};

const SortDefaults = {
  None: null,
  TimestampLatest: { ts: -1 }
};

const FieldsDefaults = {
  None: null,
  LogMessage: { script: 0 }
};

const Category = [
  "Achievement",
  "Admin",
  "AI",
  "Analytics",
  "Auth",
  "Card",
  "CardPlayer",
  "CardState",
  "Combat",
  "Decks",
  "DeckManager",
  "Dungeons",
  "Events",
  "Inventory",
  "Jenkins",
  "DataValidation",
  "Matchmaking",
  "Math",
  "Metagame",
  "Notifications",
  "Packs",
  "Quests",
  "Router",
  "Player",
  "Scheduler",
  "Shop",
  "Tutorial",
  "Util"
].reduce((all, c) => {
  all[c] = c;
  return all;
}, {});

const Containers = { "ch-backend": "h348516i1zcM", "ch-alex": "V369801KkvYT" };

exports.LogLevels = LogLevels;
exports.GSLogLevels = GSLogLevels;
exports.SortDefaults = SortDefaults;
exports.FieldsDefaults = FieldsDefaults;
exports.Category = Category;
exports.Containers = Containers;
