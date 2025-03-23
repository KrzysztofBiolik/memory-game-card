import React from "react";
import "../styles/stats.scss";

interface ResultsTableProps {
  headers: string[];
  data: (string | number)[][];
  className: string[];
}

const Stats: React.FC<ResultsTableProps> = ({ headers, data, className }) => {
  return (
    <table className={className.join(" ")}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Stats;
