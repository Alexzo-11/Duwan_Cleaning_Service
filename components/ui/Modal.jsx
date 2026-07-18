export default function Modal({ open, onClose, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 relative">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-black" onClick={onClose}>✕</button>
        {children}
      </div>
    </div>
  )
}