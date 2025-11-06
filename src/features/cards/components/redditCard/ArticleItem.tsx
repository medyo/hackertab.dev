import { useMemo } from 'react'
import { BiCommentDetail } from 'react-icons/bi'
import { BsArrowReturnRight } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
import { MdAccessTime } from 'react-icons/md'
import { VscTriangleUp } from 'react-icons/vsc'
import { CardItemWithActions, CardLink } from 'src/components/Elements'
import { Attributes } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { Article, BaseItemPropsType } from 'src/types'
import { format } from 'timeago.js'

type PostFlairPropsType = {
  text: string
  textColor?: string
  bgColor?: string
}

const PostFlair = ({ text, bgColor, textColor }: PostFlairPropsType) => {
  const color = textColor === 'light' ? '#fff' : '#000'
  const backgroundColor = bgColor ? bgColor : '#dadada'
  return (
    <div style={{ backgroundColor, color }} className="flair">
      <span>{text}</span>
    </div>
  )
}

const ArticleItem = ({ item, analyticsTag }: BaseItemPropsType<Article>) => {
  const { listingMode } = useUserPreferences()

  const subReddit = useMemo(() => {
    const parts = item.url.split('/')
    const rIndex = parts.findIndex((part) => part.toLowerCase() === 'r')
    if (rIndex !== -1 && parts.length > rIndex + 1) {
      return parts[rIndex + 1]
    }
    return null
  }, [item.url])

  return (
    <CardItemWithActions
      source={analyticsTag}
      item={item}
      cardItem={
        <>
          <CardLink
            link={item.url}
            analyticsAttributes={{
              [Attributes.POINTS]: item.points_count,
              [Attributes.TRIGERED_FROM]: 'card',
              [Attributes.TITLE]: item.title,
              [Attributes.LINK]: item.url,
              [Attributes.SOURCE]: analyticsTag,
            }}>
            {listingMode === 'compact' && (
              <div className="counterWrapper">
                <VscTriangleUp />
                <span className="value">{item.points_count}</span>
              </div>
            )}

            <div className="subTitle">
              {item.flair_text && (
                <PostFlair
                  text={item.flair_text}
                  bgColor={item.flair_background_color}
                  textColor={item.flair_text_color}
                />
              )}
              {item.title}
            </div>
          </CardLink>

          <div className="rowDetails">
            {listingMode === 'normal' && (
              <>
                <span className="rowItem redditRowItem">
                  <GoDotFill className="rowItemIcon" /> {item.points_count} upvotes
                </span>
                <span className="rowItem">
                  <MdAccessTime className="rowItemIcon" /> {format(new Date(item.published_at))}
                </span>
                <span className="rowItem">
                  <BiCommentDetail className="rowItemIcon" /> {item.comments_count} comments
                </span>
                {subReddit && (
                  <span className="rowItem">
                    <BsArrowReturnRight className="rowItemIcon" /> {`r/${subReddit}`}
                  </span>
                )}
              </>
            )}
          </div>
        </>
      }
    />
  )
}

export default ArticleItem
