import React from "react";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

const ProductionTableAisIncome = () => {
  const tableData = [
    {
      section: "Opening Stock",
      rows: [
        { particulars: "Finished Goods", date: "01-06-2025", changeInValue: 500, netValue: 10000, percentage: 10.74 },
        { particulars: "Raw Material", date: "01-06-2025", changeInValue: -600, netValue: 39500, percentage: -10.74 },
      ]
    },
    {
      section: "Purchase Accounts",
      rows: [
        { particulars: "Debit Note", date: "01-06-2025", changeInValue: 500, netValue: 2200, percentage: 10.74 },
        { particulars: "Job Work For Material", date: "01-06-2025", changeInValue: -600, netValue: 10000, percentage: -10.74 },
      ]
    },
    {
      section: "Direct Expenses",
      rows: [
        { particulars: "Car Hire Charges", date: "01-06-2025", changeInValue: 500, netValue: 1200, percentage: 10.74 },
        { particulars: "Contract Charges - Pc", date: "01-06-2025", changeInValue: -600, netValue: 2200, percentage: -10.74 },
      ]
    }
  ];

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16, fontFamily: "Arial", width: "100%", background: "#E7EBF0 " }}>
      <h3 style={{ marginBottom: 16 }}>Raw Material</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#E7EBF0 ", textAlign: "left" }}>
            <th style={{ padding: "8px" }}>Particulars</th>
            <th style={{ padding: "8px" }}>Date</th>
            <th style={{ padding: "8px" }}>Change In Value</th>
            <th style={{ padding: "8px" }}>Net Value</th>
            <th style={{ padding: "8px" }}>%</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((section, idx) => (
            <React.Fragment key={idx}>
              <tr>
                <td colSpan={5} style={{ fontWeight: "bold", paddingTop: 12 }}>{section.section}</td>
              </tr>
              {section.rows.map((row, rowIdx) => {
                const isPositive = row.changeInValue >= 0;
                return (
                  <tr key={rowIdx} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "8px 8px 8px 16px" }}>{row.particulars}</td>
                    <td style={{ padding: "8px" }}>{row.date}</td>
                    <td style={{ color: isPositive ? "green" : "red", padding: "8px" }}>
                      {isPositive ? `+${row.changeInValue}` : `${row.changeInValue}`}
                    </td>
                    <td style={{ padding: "8px" }}>{row.netValue}</td>
                    <td style={{ color: isPositive ? "green" : "red", padding: "8px", display: "flex", alignItems: "center", gap: 4 }}>
                      {isPositive ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
                      {Math.abs(row.percentage)}%
                    </td>
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductionTableAisIncome;
