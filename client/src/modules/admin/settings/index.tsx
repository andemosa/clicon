import { Stack } from "@chakra-ui/react";

import AccountSettings from "./AccountSettings";
import PasswordSettings from "./PasswordSettings";

const AdminSettingsPage = () => {
  return (
    <Stack gap={4} color={"gray.900"} w={"full"}>
      <AccountSettings />
      <PasswordSettings />
    </Stack>
  );
};

export default AdminSettingsPage;
