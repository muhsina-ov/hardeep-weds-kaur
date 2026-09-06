// ─────────────────────────────────────────────────────────────
//  WEDDING CONFIG — edit this one file per customer
// ─────────────────────────────────────────────────────────────

export const wedding = {
  bride: "Dalwinder",
  groom: "Hardeep",
  brideFull: "Dalwinder Kaur",
  groomFull: "Hardeep Singh",
  brideParents: "Daughter of Smt. Charanjit Kaur & Late S. Harmail Singh",
  groomParents: "Son of Smt. Beant Kaur & S. Jagroop Singh",
  hashtag: "#HardeepWedsDalwinder",
  monogram: "H · D",

  dateISO: "2026-11-01T10:00:00+05:30",
  dateLabel: "Sunday, 1st November 2026",
  timeLabel: "Anand Karaj & Barat",

  venue: {
    name: "The Grand Venice",
    address: "Barnala Road, Bhadaur, Punjab 148103",
    mapsQuery: "The Grand Venice, Barnala Road, Bhadaur, Punjab 148103",
    mapsUrl: "https://maps.app.goo.gl/bik3NP8SpQhrkmPaA?g_st=iw",
  },

  verse: {
    blessing: "ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ",
    text: "Together with their families, request the honour of your auspicious presence and blessings as two souls unite on the sacred path of holy matrimony.",
  },

  events: [
    {
      name: "Jaggo Ceremony",
      date: "Friday, 30th October 2026",
      dayLabel: "Friday",
      dayNum: "30",
      monthLabel: "October 2026",
      time: "7:00 PM Onwards",
      venue: "Family Residence",
      note: "An evening filled with traditional Punjabi folk music, Jaggo dance, and celebration.",
    },
    {
      name: "Barat & Anand Karaj",
      date: "Sunday, 1st November 2026",
      dayLabel: "Sunday",
      dayNum: "01",
      monthLabel: "November 2026",
      time: "10:00 AM Onwards",
      venue: "Gurudwara Bhaini Sahib & The Grand Venice, Bhadaur",
      note: "Sacred Anand Karaj ceremony at Gurudwara Bhaini Sahib followed by Barat & lunch reception at The Grand Venice.",
    },
  ],

  program: [
    { name: "Baraat Departure", time: "9:00 AM" },
    { name: "Anand Karaj (Gurudwara Bhaini Sahib)", time: "10:30 AM" },
    { name: "Milni & Welcome (The Grand Venice)", time: "12:30 PM" },
    { name: "Guru Ka Langar & Lunch Reception", time: "1:30 PM" },
  ],

  sections: {
    events: true,
    venue: true,
    countdown: true,
  },
};

export const googleCalendarUrl = () => {
  const start = new Date(wedding.dateISO);
  const end = new Date(start.getTime() + 5 * 60 * 60 * 1000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]|\.\d{3}/g, "").slice(0, 15) + "Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${wedding.groom} weds ${wedding.bride}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `${wedding.venue.name} — ${wedding.venue.address}. ${wedding.hashtag}`,
    location: `${wedding.venue.name}, ${wedding.venue.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const downloadICS = () => {
  const start = new Date(wedding.dateISO);
  const end = new Date(start.getTime() + 5 * 60 * 60 * 1000);
  // Built without a character-class regex so Tailwind's scanner won't treat it as a class.
  const fmt = (d: Date) =>
    d
      .toISOString()
      .replaceAll("-", "")
      .replaceAll(":", "")
      .replaceAll(".", "")
      .slice(0, 15) + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//InviteStory//Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@invitestory`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${wedding.groom} weds ${wedding.bride}`,
    `DESCRIPTION:${wedding.venue.name} — ${wedding.venue.address}`,
    `LOCATION:${wedding.venue.name}\\, ${wedding.venue.address}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${wedding.groom}-${wedding.bride}-wedding.ics`;
  a.click();
  URL.revokeObjectURL(url);
};

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  wedding.venue.mapsQuery
)}&output=embed`;

export const mapsDirectionsUrl =
  wedding.venue.mapsUrl ||
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    wedding.venue.mapsQuery
  )}`;
