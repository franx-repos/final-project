import React, { useEffect, useRef } from "react";
import * as gantt from "gantt";

const data = [
  {
    id: 1,
    type: "group",
    text: "Initial Iteration",
    start: new Date("2020-09-10T09:24:24.319Z"),
    end: new Date("2020-11-10T09:32:51.245Z"),
    percent: 0.05,
    links: [],
  },
  {
    id: 11,
    parent: 1,
    type: "group",
    text: "1.1 Requirements",
    start: new Date("2020-09-11T09:24:24.319Z"),
    end: new Date("2020-09-20T09:32:51.245Z"),
    percent: 0.5,
    links: [
      //   {
      //     target: 12,
      //     type: "FS",
      //   },
      //   {
      //     target: 13,
      //     type: "FS",
      //   },
    ],
  },
  {
    id: 12,
    parent: 1,
    text: "1.2 Design",
    start: new Date("2020-09-21T09:24:24.319Z"),
    end: new Date("2020-10-05T09:32:51.245Z"),
    percent: 0,
    links: [
      //   {
      //     target: 15,
      //     type: "FS",
      //   },
    ],
  },
  {
    id: 13,
    parent: 1,
    text: "1.3 API Design",
    start: new Date("2020-09-21T09:24:24.319Z"),
    end: new Date("2020-09-30T09:32:51.245Z"),
    percent: 0,
    links: [
      //   {
      //     target: 14,
      //     type: "FS",
      //   },
    ],
  },
  {
    id: 14,
    parent: 1,
    text: "1.4 API Testing",
    start: new Date("2020-10-01T09:24:24.319Z"),
    end: new Date("2020-10-06T09:32:51.245Z"),
    percent: 0,
    links: [
      //   {
      //     target: 16,
      //     type: "FS",
      //   },
    ],
  },
  {
    id: 15,
    parent: 1,
    text: "1.5 Design Review",
    start: new Date("2020-10-05T09:24:24.319Z"),
    end: new Date("2020-10-07T09:32:51.245Z"),
    percent: 0,
    links: [
      //   {
      //     target: 16,
      //     type: "FS",
      //   },
    ],
  },
  {
    id: 16,
    parent: 1,
    text: "1.6 Development",
    start: new Date("2020-10-07T09:24:24.319Z"),
    end: new Date("2020-12-10T09:32:51.245Z"),
    percent: 0,
  },
];

const options = {
  viewMode: "week",
  //   header_height: 250,
  //   column_width: 50,
  //   step: 24,
  //   view_modes: ["Quarter Day", "Half Day", "Day", "Week", "Month"],
  barHeight: 40,
  //   bar_corner_radius: 3,
  //   arrow_curve: 5,
  padding: 20,
  margin: 30,
  height: 500,
  //   date_format: "YYYY-MM-DD",
  //   custom_popup_html: null,
};

const GanttChart = (props) => {
  const ganttref = useRef(null);

  useEffect(() => {
    ganttref.current.innerHTML = null;
    const strGantt = new gantt.SVGGantt(ganttref.current, data, options);
    strGantt.render();
  }, [ganttref]);

  return <div ref={ganttref} style={{ overflowY: "hidden" }}></div>;
};

export default GanttChart;
