import { TiPlus } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { useUserPreferences } from 'src/stores/preferences'

export const UserTags = () => {
  const { userSelectedTags } = useUserPreferences()

  return (
    <div className="order-none hidden w-full flex-wrap items-center gap-2 md:order-4 md:flex">
      {userSelectedTags.map((tag, index) => (
        <span
          key={index}
          className="rounded-2xl bg-ht-900 px-2 py-0.5 text-base font-medium text-white dark:bg-ht-200">
          {tag.value}
        </span>
      ))}
      <Link
        to="/settings/topics"
        aria-label="Open settings"
        className="rounded-2xl bg-ht-900 px-2 py-0.5 font-medium">
        <TiPlus className="" />
      </Link>
    </div>
  )
}
