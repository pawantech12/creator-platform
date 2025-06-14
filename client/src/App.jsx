import Navbar from "./components/Navbar";
import { AuthProvider } from "./hooks/useauth";

function App({ element }) {
  return (
    <>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
          <Navbar />
          <main className="container mx-auto py-6 px-4 md:px-6">{element}</main>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
