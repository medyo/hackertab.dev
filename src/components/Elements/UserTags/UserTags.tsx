import { TiPlus } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { useUserPreferences } from 'src/stores/preferences'

export const UserTags = () => {
  const { userSelectedTags } = useUserPreferences()

  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      {userSelectedTags.map((tag, index) => (
        <span
          key={index}
          className="rounded-2xl bg-ht-900 px-[8px] py-[2px] font-medium text-white dark:bg-ht-200">
          {tag.value}
        </span>
      ))}
      <div className="rounded-2xl bg-ht-900 px-[8px] py-[4px] font-medium text-white hover:bg-ht-200 dark:bg-ht-200 dark:hover:bg-ht-900">
        <Link to="/settings/topics" aria-label="Open settings">
          <TiPlus className="relative mt-[-2px] fill-white dark:hover:fill-black" />
        </Link>
      </div>
    </div>
  )
}
