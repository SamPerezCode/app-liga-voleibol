import Table from "../../../ui/Table";
import type { TableColumn } from "../../../ui/Table";
import type { ClubAthleteRow } from "../types";

type Props = {
  rows: ClubAthleteRow[];
  columns: TableColumn<ClubAthleteRow>[];
};

const AthletesTableDesktop = ({ rows, columns }: Props) => {
  return (
    <div className="hidden md:block">
      <Table columns={columns} data={rows} />
    </div>
  );
};

export default AthletesTableDesktop;
