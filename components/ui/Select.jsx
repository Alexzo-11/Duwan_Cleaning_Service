export default function Select({ label, children, ...props }) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-duwan-royal focus:border-duwan-royal" {...props}>{children}</select>
    </div>
  )
}