import { useRef } from "react";
import { useOrganizations } from "../../queries/organizationQueries";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CreateOrgDlg } from "./CreateOrgDlg";

export const Organizations = () => {
  const { data, isPending, error } = useOrganizations();
  const dialogRef = useRef(null);

  const statusTemplate = ({ isActive }) => (
    <span className={`badge ${isActive ? "badge--active" : "badge--inactive"}`}>
      {isActive ? "Active" : "Inactive"}
    </span>
  );

  if (error) {
    return (
      <div className="max-content-wrapper page-card">
        <p style={{ color: "var(--clr-danger)" }}>
          Failed to load organizations. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="max-content-wrapper page-card">
      <h1 className="page-title">Organizations</h1>

      <div className="page-actions">
        <button
          type="button"
          className="btn btn--primary"
          aria-label="Create New Organization"
          onClick={() => dialogRef.current.showModal()}
        >
          + New Organization
        </button>
      </div>

      <DataTable
        value={data ?? []}
        stripedRows
        responsiveLayout="scroll"
        emptyMessage="No organizations found"
        loading={isPending}
        tableStyle={{ minWidth: "50rem" }}
        dataKey="_id"
        size="large"
        rowHover
        paginator
        rows={10}
        paginatorTemplate="PrevPageLink PageLinks NextPageLink RowsPerPageDropdown"
        rowsPerPageOptions={[10, 25, 50, 100]}
        className="p-datatable-lg"
      >
        <Column field="name" header="Organization Name" sortable frozen />
        <Column header="Status" body={statusTemplate} />
        <Column field="establishedYear" header="Established Year" sortable />
      </DataTable>

      <CreateOrgDlg ref={dialogRef} />
    </div>
  );
};
