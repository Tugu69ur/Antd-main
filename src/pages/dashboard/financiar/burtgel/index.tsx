import UserTable from "components/Table";
import TableToolbar from "../../../../components/tableHeaderTool";
import React, { useState, useEffect } from "react";
import Header from "components/headerTool";

function index() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    if (window.location.pathname.includes("burtgel")) {
      setSelectedTable("Ачаа дөхөлт");
    } else if (window.location.pathname.includes("lavlah")) {
      setSelectedTable("Харилцагч компани");
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
