import './settingsContentLayout.css'

type SettingsContentLayoutProps = {
  title: string
  description: string
  children: React.ReactNode
}

export const SettingsContentLayout = ({
  title,
  description,
  children,
}: SettingsContentLayoutProps) => {
  return (
    <div className="settingsContent">
      <header>
        <h1 className="title">{title}</h1>
        <p className="description">{description}</p>
      </header>
      <main className="settingsBody scrollable">{children}</main>
    </div>
  )
}
