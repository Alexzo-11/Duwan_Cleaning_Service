export default function Input({ label, ...props }) {
  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-duwan-royal focus:border-duwan-royal" {...props} />
    </div>
  )
}