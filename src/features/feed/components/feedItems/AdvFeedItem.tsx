import { GoDotFill } from 'react-icons/go'
import { useGetAd } from 'src/features/adv'
import { useUserPreferences } from 'src/stores/preferences'

export const AdvFeedItem = () => {
  const { userSelectedTags } = useUserPreferences()

  const {
    data: ad,
    isLoading,
    isError,
  } = useGetAd({
    keywords: userSelectedTags.map((tag) => tag.label.toLocaleLowerCase()),
    aditionalAdQueries: undefined,
    config: {
      cacheTime: 0,
      staleTime: 0,
      useErrorBoundary: false,
    },
  })

  if (isLoading) {
    return (
      <div className="placeholder">
        <div className="image"></div>
        <div className="line"></div>
        <div className="smallLine"></div>
      </div>
    )
  }

  if (isError || !ad) {
    return null
  }

  return (
    <div className="blockRow">
      <div className="rowTitle">
        <a className="rowLink titleWithCover" href={ad.link}>
          <div className="rowCover">
            <img
              src={ad.imageUrl}
              alt={ad.title}
              className=""
              style={{ border: 0 }}
              width={260}
              height={200}
            />
          </div>

          <span className="subTitle">{ad.description}</span>
        </a>
      </div>
      <div className="rowDetails">
        <span className="rowItem">
          <a href={ad.provider.link} target="_blank" rel="noopener sponsored noreferrer">
            <GoDotFill className="rowItemIcon" /> {ad.provider.title}
          </a>
        </span>
      </div>
      {ad.viewUrl &&
        ad.viewUrl
          .split('||')
          .map((viewUrl, i) => <img key={i} src={viewUrl} className="hidden" alt="" />)}
    </div>
  )
}
