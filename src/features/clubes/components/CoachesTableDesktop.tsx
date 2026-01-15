import Table from "../../../ui/Table";
import type { TableColumn } from "../../../ui/Table";
import type { ClubCoachRow } from "../types";

type Props = {
  rows: ClubCoachRow[];
  columns: TableColumn<ClubCoachRow>[];
};

const CoachesTableDesktop = ({ rows, columns }: Props) => {
  return (
    <div className="hidden md:block">
      <Table columns={columns} data={rows} />
    </div>
  );
};

export default CoachesTableDesktop;
