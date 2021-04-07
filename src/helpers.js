export function parseDate(d) {
  const matches = d.match(/\d+/)
  if (matches) {
    return new Date(parseInt(matches[0], 10))
  }
  return new Date()
}

export function dateDifference(start, end) {
  return Math.round((end.getTime() - start.getTime()) / 1000 / 60)
}

export function parsePlatform(p) {
  return p ? { name: p.Name, type: p.Type } : undefined
}

export const MODES = {
  Unknown: {
    title: 'Unknown',
    name: 'Unknown',
    iconUrl: 'https://www.dvb.de/assets/img/trans-icon/transport-tram.svg',
  },
  Tram: {
    title: 'Straßenbahn',
    name: 'Tram',
    iconUrl: 'https://www.dvb.de/assets/img/trans-icon/transport-tram.svg',
  },
  CityBus: {
    title: 'Bus',
    name: 'CityBus',
    iconUrl: 'https://www.dvb.de/assets/img/trans-icon/transport-bus.svg',
  },
  IntercityBus: {
    title: 'Regio-Bus',
    name: 'IntercityBus',
    iconUrl: 'https://www.dvb.de/assets/img/trans-icon/transport-bus.svg',
  },
  SuburbanRailway: {
    title: 'S-Bahn',
    name: 'SuburbanRailway',
    iconUrl:
      'https://www.dvb.de/assets/img/trans-icon/transport-metropolitan.svg',
  },
  Train: {
    title: 'Zug',
    name: 'Train',
    iconUrl: 'https://www.dvb.de/assets/img/trans-icon/transport-train.svg',
  },
  Cableway: {
    title: 'Seil-/Schwebebahn',
    name: 'Cableway',
    iconUrl: 'https://www.dvb.de/assets/img/trans-icon/transport-lift.svg',
  },
  Ferry: {
    title: 'Fähre',
    name: 'Ferry',
    iconUrl: 'https://www.dvb.de/assets/img/trans-icon/transport-ferry.svg',
  },
  HailedSharedTaxi: {
    title: 'Anrufsammeltaxi (AST)/ Rufbus',
    name: 'HailedSharedTaxi',
    iconUrl: 'https://www.dvb.de/assets/img/trans-icon/transport-alita.svg',
  },
  Footpath: {
    title: 'Fussweg',
    name: 'Footpath',
    iconUrl: 'https://www.dvb.de/assets/img/trans-icon/walk.svg',
  },
  StairsUp: {
    title: 'Treppe aufwärts',
    name: 'StairsUp',
    iconUrl: 'https://www.dvb.de/assets/img/trans-icon/stairs-up.svg',
  },
  StairsDown: {
    title: 'Treppe abwärts',
    name: 'StairsDown',
    iconUrl: 'https://www.dvb.de/assets/img/trans-icon/stairs-down.svg',
  },
  EscalatorUp: {
    title: 'Rolltreppe aufwärts',
    name: 'EscalatorUp',
    iconUrl: 'https://www.dvb.de/assets/img/trans-icon/escalator-up.svg',
  },
  EscalatorDown: {
    title: 'Rolltreppe abwärts',
    name: 'EscalatorDown',
    iconUrl: 'https://www.dvb.de/assets/img/trans-icon/escalator-down.svg',
  },
  ElevatorUp: {
    title: 'Fahrstuhl aufwärts',
    name: 'ElevatorUp',
    iconUrl: 'https://www.dvb.de/assets/img/trans-icon/elevator-up.svg',
  },
  ElevatorDown: {
    title: 'Fahrstuhl abwärts',
    name: 'ElevatorDown',
    iconUrl: 'https://www.dvb.de/assets/img/trans-icon/elevator-down.svg',
  },
  StayForConnection: {
    title: 'gesicherter Anschluss',
    name: 'StayForConnection',
    iconUrl: 'https://www.dvb.de/assets/img/trans-icon/sit.svg',
  },
  PlusBus: {
    title: 'PlusBus',
    name: 'PlusBus',
    iconUrl: 'https://www.dvb.de/assets/img/trans-icon/transport-plusbus.svg',
  },
}

export function parseMode(name) {
  if (!name) {
    return undefined
  }

  switch (name.toLowerCase()) {
    case 'tram':
      return MODES.Tram
    case 'bus':
    case 'citybus':
      return MODES.CityBus
    case 'intercitybus':
      return MODES.IntercityBus
    case 'suburbanrailway':
      return MODES.SuburbanRailway
    case 'train':
    case 'rapidtransit':
      return MODES.Train
    case 'footpath':
      return MODES.Footpath
    case 'cableway':
    case 'overheadrailway':
      return MODES.Cableway
    case 'ferry':
      return MODES.Ferry
    case 'hailedsharedtaxi':
      return MODES.HailedSharedTaxi
    case 'mobilitystairsup':
      return MODES.StairsUp
    case 'mobilitystairsdown':
      return MODES.StairsDown
    case 'mobilityescalatorup':
      return MODES.EscalatorUp
    case 'mobilityescalatordown':
      return MODES.EscalatorDown
    case 'mobilityelevatorup':
      return MODES.ElevatorUp
    case 'mobilityelevatordown':
      return MODES.ElevatorDown
    case 'stayforconnection':
      return MODES.StayForConnection
    case 'plusbus':
      return MODES.PlusBus
    default:
      return MODES.Unknown
  }
}
