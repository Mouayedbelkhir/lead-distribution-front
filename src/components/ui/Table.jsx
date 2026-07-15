export function Table({ headers, children, actionsHeader }) {
  return (
    <div className="table-responsive">
      <table className="table data-table mb-0">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
            {actionsHeader && <th className="text-end">{actionsHeader}</th>}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
