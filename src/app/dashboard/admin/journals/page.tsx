"use client";

import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import MutationJournalTable from "@/components/dashboardAdmin/journal/MutationJournalTable";

const AdminJournal = () => {
  
  return (
    <div className="flex min-h-screen flex-col">
      <ToastContainer />
        <main className="flex-grow p-6 shadow-md overflow-hidden">
          {/* Journal Table */}
          <Suspense fallback={<div>Loading Journals Management...</div>}>
            <MutationJournalTable />
          </Suspense>
        </main>
      </div>
  );
};

export default AdminJournal;