// app/services/layout.jsx (or app/(public)/services/layout.jsx)
export default function ServicesLayout({ children }) {
  return (
    <div>
      <h1>Services Section</h1>
      {children}
    </div>
  );
}