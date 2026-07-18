export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'font-semibold py-2 px-6 rounded-lg transition-colors disabled:opacity-50'
  const variants = {
    primary: 'bg-duwan-royal text-white hover:bg-duwan-light',
    outline: 'border border-duwan-royal text-duwan-royal hover:bg-duwan-royal hover:text-white',
  }
  return <button className={`${base} ${variants[variant]} ${className}`} {...props}>{children}</button>
}