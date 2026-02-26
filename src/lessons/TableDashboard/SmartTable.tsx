export interface SmartTableColumn {
  name: string;
  label: string;
  key: string;
  type: "string" | "number" | "date";
}

export interface SmartTableAction {
  name: string;
  label: string;
  onClick: (row: { rowData: any; index: number }) => void;
}

interface SmartTableProps {
  data: any[];
  columns: SmartTableColumn[];
  actions?: SmartTableAction[];
  displayIndex?: boolean;
}

export const SmartTableCell = (props: { value: any; type: "string" | "number" | "date" }) => {
  switch (props.type) {
    case "number":
      return <span>{props.value.toLocaleString()}</span>;
    case "date":
      return <span>{new Date(props.value).toLocaleDateString()}</span>;
    case "string":
    default:
      return <span>{props.value}</span>;
  }
};

export const SmartTable = (props: SmartTableProps) => {
  console.log("--- TABLE RENDERED ---");
  return (
    <table className="smart-table">
      <thead>
        <tr>
          {props.displayIndex && <th>#</th>}
          {props.columns.map((column) => (
            <th key={column.name}>{column.label}</th>
          ))}
          {props.actions?.length && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {props.data.map((rowData, rowIndex) => {
          return (
            <tr key={rowIndex}>
              {props.displayIndex && <td>{rowIndex + 1}</td>}
              {props.columns.map((column) => (
                <td key={column.name}>
                  <SmartTableCell value={rowData[column.key]} type={column.type} />
                </td>
              ))}
              {props.actions?.length && (
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {props.actions.map((action) => (
                      <button 
                        key={action.name} 
                        className="action-btn"
                        onClick={() => action.onClick({ rowData, index: rowIndex })}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
