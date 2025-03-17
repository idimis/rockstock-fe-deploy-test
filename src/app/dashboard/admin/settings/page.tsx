"use client";

const AdminSettings = () => {
  return (
    <main className="flex-grow p-6 bg-white shadow-md">
      <h1 className="text-xl font-bold mb-4">Admin Settings</h1>
      
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">🔐 Account Settings</h2>
        <p>Manage your account details and security settings.</p>
        <button 
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
          onClick={() => window.location.href = "/account-settings"}
        >
          Edit Profile
        </button>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">📧 Email Notifications</h2>
        <p>Configure email alerts for order updates, reports, and more.</p>
        <button 
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
          onClick={() => window.location.href = "/email-notifications"}
        >
          Manage Notifications
        </button>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">⚙️ System Preferences</h2>
        <p>Adjust settings for language, time zone, and dashboard preferences.</p>
        <button 
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
          onClick={() => window.location.href = "/system-preferences"}
        >
          Update Preferences
        </button>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">🔄 Backup & Restore</h2>
        <p>Backup your data or restore from a previous backup.</p>
        <button 
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
          onClick={() => window.location.href = "/backup-restore"}
        >
          Backup Now
        </button>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">🚪 Logout & Security</h2>
        <p>Manage login sessions and security settings.</p>
        <button 
          className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
          onClick={() => window.location.href = "/logout"}
        >
          Logout All Devices
        </button>
      </section>
    </main>
  );
};

export default AdminSettings;