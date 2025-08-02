import PermMediaIcon from "@mui/icons-material/PermMedia";
import {
  DatagridConfigurable,
  ExportButton,
  List,
  ListProps,
  NumberField,
  Pagination,
  ResourceProps,
  SearchInput,
  TextField,
  TopToolbar,
  useListContext,
} from "react-admin";

import { DeleteMediaButton, PurgeRemoteMediaButton } from "../components/media";

const ListActions = () => {
  const { isLoading, total } = useListContext();
  return (
    <TopToolbar>
      <DeleteMediaButton />
      <PurgeRemoteMediaButton />
      <ExportButton disabled={isLoading || total === 0} />
    </TopToolbar>
  );
};

const UserMediaStatsPagination = () => <Pagination rowsPerPageOptions={[10, 25, 50, 100, 500, 1000]} />;

const userMediaStatsFilters = [<SearchInput source="search_term" alwaysOn />];

export const UserMediaStatsList = (props: ListProps) => (
  <List
    {...props}
    actions={<ListActions />}
    filters={userMediaStatsFilters}
    pagination={<UserMediaStatsPagination />}
    sort={{ field: "media_length", order: "DESC" }}
    perPage={50}
  >
    <DatagridConfigurable rowClick={id => "/users/" + id + "/media"} bulkActionButtons={false}>
      <TextField source="user_id" label="resources.users.fields.id" />
      <TextField source="displayname" label="resources.users.fields.displayname" />
      <NumberField source="media_count" />
      <NumberField source="media_length" />
    </DatagridConfigurable>
  </List>
);

const resource: ResourceProps = {
  name: "user_media_statistics",
  icon: PermMediaIcon,
  list: UserMediaStatsList,
};

export default resource;
