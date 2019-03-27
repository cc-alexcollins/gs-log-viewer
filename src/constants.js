const LogLevel = {
  Debug: "Debug",
  Error: "Error",
  Exception: "Exception"
};

const LogLevelQuery = {
  [LogLevel.Debug]: {
    level: "DEBUG"
  },
  [LogLevel.Error]: {
    level: "ERROR",
    "log.exception": { $exists: false }
  },
  [LogLevel.Exception]: {
    level: "ERROR",
    "log.exception": { $exists: true }
  }
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

const Containers = {
  "ch-backend": "h348516i1zcM",
  "ch-stable": "C372272aaX47",
  "ch-alex": "V369801KkvYT",
  "ch-chui": "M353105pZ4RV"
};

exports.LogLevel = LogLevel;
exports.LogLevelQuery = LogLevelQuery;
exports.SortDefaults = SortDefaults;
exports.FieldsDefaults = FieldsDefaults;
exports.Category = Category;
exports.Containers = Containers;
