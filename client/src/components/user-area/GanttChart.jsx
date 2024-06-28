import React, { useEffect, useRef } from "react";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import gantt from "dhtmlx-gantt";

const GanttChart = ({ tasks }) => {
  const ganttContainer = useRef(null);

  useEffect(() => {
    // Gantt initialisieren und konfigurieren
    gantt.config.xml_date = "%Y-%m-%d %H:%i";
    gantt.init(ganttContainer.current);
    gantt.parse(tasks);

    // Cleanup bei Komponentendemontage
    return () => {
      gantt.clearAll();
    };
  }, [tasks]);

  return (
    <div ref={ganttContainer} style={{ width: "100%", height: "100%" }}></div>
  );
};

export default GanttChart;
