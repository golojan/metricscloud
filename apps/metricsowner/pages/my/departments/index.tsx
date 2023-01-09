import React from "react";
import OwnerLayout from "../../../components/OwnerLayout";
import AppDrawer from "../../../serverlets/AppDrawer";
import AppHeader from "../../../serverlets/AppHeader";

function Index() {
  return (
    <OwnerLayout>
      <AppHeader isroot={false} />
      <AppDrawer onchat={false} menuitem="departments" />
    </OwnerLayout>
  );
}

export default Index;
