import './settingsContentLayout.css'

type SettingsContentLayoutProps = {
  title: string
  description: string
  children: React.ReactNode
  actions?: React.ReactNode
}

export const SettingsContentLayout = ({
  title,
  description,
  actions,
  children,
}: SettingsContentLayoutProps) => {
  return (
    <div className="settingsContent">
      <header>
        <div className="settingsHeader">
          <h1 className="title">{title}</h1>
          <p className="description">{description}</p>
        </div>

        {actions && <div className="actions">{actions}</div>}
      </header>
      <main className="settingsBody scrollable">{children}</main>
    </div>
  )
}
