import type {
  TimeLineDetails,
  TimeLineEventType,
  TimeLineProps,
} from "vergins";
import { work, education } from "$constants";

const iconMaps: Map<string, string> = new Map([
  ["work", work],
  ["education", education],
]);

export const timeLineProps: TimeLineProps = {
  icons: iconMaps,
  delay: null,
  duration: null,
};

export const events: TimeLineDetails[] = [
  {
    dateStart: "08-01-2018",
    dateEnd: "03-31-2020",
    position: "+2 Science Student",
    description:
      "Completed high school education with a strong focus on science subjects including Physics, Chemistry, and Mathematics, achieving an impressive score of 86.7%. This foundation set the stage for future studies in engineering.",
    name: "Ravenshaw University",
    event: "education" as TimeLineEventType,
    location: "Cuttack, India",
    alignment: "left",
    link: null,
    iconDataType: "svg",
  },
  {
    dateStart: "11-01-2020",
    dateEnd: "07-31-2024",
    position: "Bachelor of Technology Student",
    description:
      "Pursued a Bachelor of Technology (BTech) in Electrical and Electronics Engineering, developing technical skills in Redux.js, C++, data structures, and circuit design. Gained practical knowledge through projects and internships, preparing for a career in technology and innovation.",
    name: "National Institute of Technology Rourkela",
    event: "education" as TimeLineEventType,
    location: "Rourkela, India",
    alignment: "right",
    link: "https://www.nitrkl.ac.in",
    iconDataType: "svg",
  },
  {
    dateStart: "06-01-2023",
    dateEnd: "07-31-2023",
    position: "Application Engineer Intern",
    description:
      "Contributed to application development projects utilizing technologies such as React.js and Redux.js. Collaborated with cross-functional teams to design and implement user-friendly interfaces and optimize performance in a remote work setting.",
    name: "Accenture",
    event: "work" as TimeLineEventType,
    location: "Bengaluru, Karnataka, India (Remote)",
    alignment: "left",
    link: "https://www.accenture.com/in-en",
    iconDataType: "svg",
  },
  {
    dateStart: "01-01-2024",
    dateEnd: "08-01-2024",
    position: "Product Engineering Intern",
    description:
      "Participated in end-to-end product development, gaining hands-on experience in designing, coding, and debugging software solutions at Juspay. Contributed to enhancing product features and improving user experience.",
    name: "Juspay",
    event: "work" as TimeLineEventType,
    location: "Bengaluru, Karnataka, India",
    alignment: "right",
    link: "https://juspay.io/in",
    iconDataType: "svg",
  },
  {
    dateStart: "08-01-2024",
    dateEnd: "present",
    position: "Product Engineer",
    description:
      "Playing a key role in product development and innovation at Juspay. Responsibilities include building scalable systems, collaborating with teams to develop and deploy product features, and contributing to a seamless user experience.",
    name: "Juspay",
    event: "work" as TimeLineEventType,
    location: "Bengaluru, Karnataka, India",
    alignment: "left",
    link: "https://juspay.io/in",
    iconDataType: "svg",
  },
];
