import { League, MatchCompetition, SportCategory } from "@/types";

export const mockSports: SportCategory[] = [
  { id: "all", name: "All", icon: "" },
  { id: "s1", name: "Football", icon: "soccer-ball" }, // We'll use lucide or expo/vector-icons
  { id: "s2", name: "Basketball", icon: "basketball-ball" },
];

export const mockLeagues: League[] = [
  { id: "l1", name: "FIFA WORLD CUP" },
  { id: "l2", name: "NBA" },
  { id: "l3", name: "NFL" },
];

export const mockMatches: MatchCompetition[] = [
  {
    id: "m1",
    title: "FIFA WORLD CUP",
    status: "latest",
    sportId: "s1",
    leagueId: "l1",
    teamA: {
      id: "t1",
      name: "Texas",
      logo: "https://flagcdn.com/w80/us-tx.png",
    },
    teamB: {
      id: "t2",
      name: "Florida",
      logo: "https://flagcdn.com/w80/us-fl.png",
    },
    entryFee: 20,
    prizePool: 20,
    dateTime: "Saturday 27, Feb, 8:30 AM",
    backgroundImage:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "m2",
    title: "FIFA WORLD CUP",
    status: "upcoming",
    sportId: "s1",
    leagueId: "l1",
    teamA: {
      id: "t3",
      name: "Texas",
      logo: "https://flagcdn.com/w80/us-tx.png",
    },
    teamB: {
      id: "t4",
      name: "Florida",
      logo: "https://flagcdn.com/w80/us-fl.png",
    },
    entryFee: 20,
    prizePool: 20,
    dateTime: "Saturday 27, Feb, 8:30 AM",
    backgroundImage:
      "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "m3",
    title: "NBA FINALS",
    status: "completed",
    sportId: "s2",
    leagueId: "l2",
    teamA: {
      id: "t5",
      name: "Lakers",
      logo: "https://flagcdn.com/w80/us-ca.png",
    },
    teamB: {
      id: "t6",
      name: "Bulls",
      logo: "https://flagcdn.com/w80/us-il.png",
    },
    entryFee: 50,
    prizePool: 100,
    dateTime: "Sunday 28, Feb, 9:00 PM",
    backgroundImage:
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "m4",
    title: "NFL SUPERBOWL",
    status: "upcoming",
    sportId: "s3",
    leagueId: "l3",
    teamA: {
      id: "t7",
      name: "Chiefs",
      logo: "https://flagcdn.com/w80/us-mo.png",
    },
    teamB: {
      id: "t8",
      name: "49ers",
      logo: "https://flagcdn.com/w80/us-ca.png",
    },
    entryFee: 100,
    prizePool: 500,
    dateTime: "Monday 1, Mar, 6:30 PM",
    backgroundImage:
      "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "m5",
    title: "PREMIER LEAGUE",
    status: "latest",
    sportId: "s1",
    leagueId: "l1",
    teamA: {
      id: "t9",
      name: "Arsenal",
      logo: "https://flagcdn.com/w80/gb-eng.png",
    },
    teamB: {
      id: "t10",
      name: "Chelsea",
      logo: "https://flagcdn.com/w80/gb-eng.png",
    },
    entryFee: 10,
    prizePool: 30,
    dateTime: "Tuesday 2, Mar, 3:00 PM",
    backgroundImage:
      "https://images.unsplash.com/photo-1518605368461-1e18ac49b6ce?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "m6",
    title: "NBA PLAYOFFS",
    status: "completed",
    sportId: "s2",
    leagueId: "l2",
    teamA: {
      id: "t11",
      name: "Warriors",
      logo: "https://flagcdn.com/w80/us-ca.png",
    },
    teamB: {
      id: "t12",
      name: "Celtics",
      logo: "https://flagcdn.com/w80/us-ma.png",
    },
    entryFee: 25,
    prizePool: 80,
    dateTime: "Friday 26, Feb, 7:00 PM",
    backgroundImage:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "m7",
    title: "UEFA CHAMPIONS",
    status: "upcoming",
    sportId: "s1",
    leagueId: "l1",
    teamA: {
      id: "t13",
      name: "Madrid",
      logo: "https://flagcdn.com/w80/es.png",
    },
    teamB: {
      id: "t14",
      name: "Munich",
      logo: "https://flagcdn.com/w80/de.png",
    },
    entryFee: 75,
    prizePool: 150,
    dateTime: "Wednesday 3, Mar, 8:00 PM",
    backgroundImage:
      "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "m8",
    title: "NFL PLAYOFFS",
    status: "latest",
    sportId: "s3",
    leagueId: "l3",
    teamA: {
      id: "t15",
      name: "Ravens",
      logo: "https://flagcdn.com/w80/us-md.png",
    },
    teamB: {
      id: "t16",
      name: "Bills",
      logo: "https://flagcdn.com/w80/us-ny.png",
    },
    entryFee: 40,
    prizePool: 120,
    dateTime: "Sunday 7, Mar, 4:00 PM",
    backgroundImage:
      "https://images.unsplash.com/photo-1628891435222-06592f61eade?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "m9",
    title: "NBA REGULAR",
    status: "upcoming",
    sportId: "s2",
    leagueId: "l2",
    teamA: {
      id: "t17",
      name: "Heat",
      logo: "https://flagcdn.com/w80/us-fl.png",
    },
    teamB: {
      id: "t18",
      name: "Knicks",
      logo: "https://flagcdn.com/w80/us-ny.png",
    },
    entryFee: 5,
    prizePool: 15,
    dateTime: "Thursday 4, Mar, 7:30 PM",
    backgroundImage:
      "https://images.unsplash.com/photo-1627627256672-027a461c36ae?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "m10",
    title: "SERIE A",
    status: "completed",
    sportId: "s1",
    leagueId: "l1",
    teamA: {
      id: "t19",
      name: "Juventus",
      logo: "https://flagcdn.com/w80/it.png",
    },
    teamB: { id: "t20", name: "Milan", logo: "https://flagcdn.com/w80/it.png" },
    entryFee: 15,
    prizePool: 40,
    dateTime: "Monday 22, Feb, 8:45 PM",
    backgroundImage:
      "https://images.unsplash.com/photo-1551280857-bcaf13d4bdf7?q=80&w=600&auto=format&fit=crop",
  },
];
