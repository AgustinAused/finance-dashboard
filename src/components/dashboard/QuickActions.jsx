import React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddIcon from "@mui/icons-material/Add";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import BarChartIcon from "@mui/icons-material/BarChart";

export default function QuickActions({ onIncome, onExpense, onReports }) {
  const actions = [
    { icon: <AttachMoneyIcon />, name: "Add Income", onClick: onIncome },
    { icon: <TrendingDownIcon />, name: "Add Expense", onClick: onExpense },
    { icon: <BarChartIcon />, name: "View Reports", onClick: onReports },
  ];

  return (
    <SpeedDial 
    ariaLabel="Quick Actions" 
    direction="left"
    sx={{
        left: 16, // Separación desde la izquierda
      }}
    icon={<AddIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
}
