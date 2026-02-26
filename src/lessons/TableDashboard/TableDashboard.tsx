import { useCallback, useEffect, useState, useMemo } from "react";
import { SmartTable, SmartTableColumn } from "./SmartTable";
import { fakeDataGenerator } from "./Data";
import { Switcher } from "../../common/components/Switcher/Switcher";
import "./TableDashboard.scss";

const initialData = fakeDataGenerator(20);

export const TableDashboard = () => {
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState(initialData);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  
  // NOTE: This array is recreated on every render! 
  // This causes SmartTable (wrapped in memo) to re-render even if data didn't change.
  const columns: SmartTableColumn[] = [
    { name: "name", label: "Name", key: "name", type: "string" },
    { name: "age", label: "Age", key: "age", type: "number" },
    { name: "dob", label: "Date of Birth", key: "dob", type: "date" },
  ];

  /* 
  // FIX: useMemo to keep reference stable
  const columns = useMemo(() => [
    { name: "name", label: "Name", key: "name", type: "string" },
    { name: "age", label: "Age", key: "age", type: "number" },
    { name: "dob", label: "Date of Birth", key: "dob", type: "date" },
  ], []);
  */

  const actions = [
    {
      name: "view",
      label: "View",
      onClick: ({ rowData }: { rowData: any }) => {
        alert(`Viewing ${rowData.name}`);
      },
    },
  ];

  const filterData = useCallback((data: any[], filter: string) => {
    return !filter ? data : data.filter((row) => row.name.toLowerCase().includes(filter.toLowerCase()));
  }, []);

  useEffect(() => {
    setFilteredData(filterData(initialData, filter));
  }, [filter, filterData]);

  return (
    <div className="table-dashboard">
      <header>
        <h2>Users Dashboard</h2>
        <div className="view-mode-switcher">
             <Switcher
                isChecked={viewMode === "card"}
                onChange={() => setViewMode(viewMode === "table" ? "card" : "table")}
                labelLeft="Comfortable"
                labelRight="Compact"
            />
        </div>
      </header>

      <div className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search users by name..."
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </div>
      
      <div className={`smart-table-container ${viewMode}`}>
         <SmartTable data={filteredData} columns={columns} actions={actions} />
      </div>
    </div>
  );
};
