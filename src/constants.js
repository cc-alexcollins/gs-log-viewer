const LogLevels = {
  Debug: "DEBUG",
  Error: "ERROR"
};

const SortDefaults = {
  None: null,
  TimestampLatest: { ts: -1 }
};

const FieldsDefaults = {
  None: null,
  LogMessage: { _id: -1, script: -1 }
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

exports.LogLevels = LogLevels;
exports.SortDefaults = SortDefaults;
exports.Category = Category;
