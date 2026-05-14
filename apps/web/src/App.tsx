import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Placeholder pages - to be implemented in Phase 2
const Dashboard = () => <div className="p-8"><h1 className="text-2xl font-bold">Dashboard | ዳሽቦርድ</h1></div>;
const Inventory = () => <div className="p-8"><h1 className="text-2xl font-bold">Inventory | ክምችት</h1></div>;
const Sales = () => <div className="p-8"><h1 className="text-2xl font-bold">Sales | ሽያጮች</h1></div>;
const Audit = () => <div className="p-8"><h1 className="text-2xl font-bold">Audit | ኦዲት</h1></div>;
const OCRScan = () => <div className="p-8"><h1 className="text-2xl font-bold">Scan Item | ነገር አጣራ</h1></div>;
const Settings = () => <div className="p-8"><h1 className="text-2xl font-bold">Settings | ቅንብሮች</h1></div>;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          {/* Navigation placeholder */}
          <nav className="bg-white shadow-sm border-b no-print">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-primary-600">
                    Addis Profit Finder | አዲስ ፕሮፊት ፋይንደር
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  <a href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</a>
                  <a href="/inventory" className="text-gray-600 hover:text-gray-900">Inventory</a>
                  <a href="/sales" className="text-gray-600 hover:text-gray-900">Sales</a>
                  <a href="/audit" className="text-gray-600 hover:text-gray-900">Audit</a>
                  <a href="/scan" className="text-gray-600 hover:text-gray-900">Scan</a>
                  <a href="/settings" className="text-gray-600 hover:text-gray-900">Settings</a>
                </div>
              </div>
            </div>
          </nav>

          {/* Main content */}
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/audit" element={<Audit />} />
              <Route path="/scan" element={<OCRScan />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t mt-auto no-print">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <p className="text-center text-gray-500 text-sm">
                © 2026 Addis Profit Finder - The Digital Face of Ethiopia
              </p>
              <p className="text-center text-gray-400 text-xs mt-2">
                Compliant with Data Protection Proclamation 1321/2024
              </p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
