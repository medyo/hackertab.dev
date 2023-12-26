import './panel.css'

const variants = {
  information: 'information',
  warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
}
type PanelProps = {
  title: string | React.ReactNode
  body: string | React.ReactNode
  variant: keyof typeof variants
}

export const Panel = ({ title, body, variant = 'information' }: PanelProps) => {
  return (
    <div className={`panel ${variants[variant]}`}>
      <h3 className="title">{title}</h3>
      <p className="body">{body}</p>
    </div>
  )
}
