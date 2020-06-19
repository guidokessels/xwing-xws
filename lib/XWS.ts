export type XWSSquadron = {
  faction: string;
  pilots: XWSPilot[];
  name?: string;
  description?: string;
  obstacles?: string[];
  points?: number;
  vendor?: Record<string, XWSVendor>;
  version?: string;
};

type XWSPilot = {
  id: string;
  ship?: string;
  upgrades?: XWSUpgrades;
  points?: number;
};

type XWSUpgrades = {
  [slot: string]: string[];
};

type XWSVendor = {
  builder?: string;
  builder_url?: string;
  link?: string;
};
