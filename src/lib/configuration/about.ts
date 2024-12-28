import type { TimeLineDetails, TimeLineEventType } from "vergins";

export const events: TimeLineDetails[] = [
  {
    dateStart: "01-01-2020",
    dateEnd: "31-02-2024",
    position: "Student",
    description:
      "Completed a Bachelor’s in Computer Science, focusing on software development and data structures.",
    name: "University of XYZ",
    event: "education" as TimeLineEventType,
    location: "New York, USA",
    alignment: "left",
    link: null,
  },
  {
    dateStart: "01-02-2024",
    dateEnd: "01-02-2027",
    position: "Software Engineer",
    description:
      "Developed scalable web applications and collaborated with cross-functional teams.",
    name: "Company X",
    event: "work" as TimeLineEventType,
    location: "San Francisco, USA",
    alignment: "left",
    link: "https://www.companyx.com",
  },
  {
    dateStart: "02-02-2027",
    dateEnd: "present",
    position: "Senior Software Engineer",
    description:
      "Leading a team in software design, mentoring developers, and driving innovation.",
    name: "Company Y",
    event: "work" as TimeLineEventType,
    location: "London, UK",
    alignment: "right",
    link: "https://www.companyy.com",
  },
];
