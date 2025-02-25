import UserTable from "components/Table";
import React, { useState, useEffect } from "react";
import Header from "components/headerTool";
import TableToolbar from "../../../../components/tableHeaderTool";

function index() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    // Set default table based on the current path
    if (window.location.pathname.includes("tailan")) {
      setSelectedTable("Э/Х орлогын тайлан");
    }
  }, []);

  const handleButtonClick = (buttonName: string) => {
    setSelectedTable(buttonName);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className="mt-[-30px]">
      <div className="mb-4">
        <Header
          onButtonClick={handleButtonClick}
          selectedTable={selectedTable}
        />
      </div>
      <div className="w-full h-full bg-white rounded-2xl p-1">
        <div style={{ color: "#344054" }}>
          <TableToolbar
            title="Нийт"
            totalUsers={totalUsers}
            onSearch={handleSearch}
            onDateChange={(dates, dateStrings) => {}}
            selectedTable={selectedTable}
          />
        </div>

        <UserTable
          selectedTable={selectedTable}
          searchQuery={searchQuery}
          setTotalUsers={setTotalUsers}
        />
      </div>
    </div>
  );
}

export default index;
