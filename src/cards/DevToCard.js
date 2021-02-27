import React, { useContext, useState, useEffect } from 'react'
import { FaDev } from 'react-icons/fa';
import devtoApi from '../services/devto'
import CardComponent from "../components/CardComponent"
import ListComponent from "../components/ListComponent"
import { format } from 'timeago.js';
import PreferencesContext from '../preferences/PreferencesContext'
import CardLink from "../components/CardLink"
import { BiCommentDetail } from 'react-icons/bi';
import { MdAccessTime } from "react-icons/md"
import { AiOutlineLike } from "react-icons/ai"
import CardItemWithActions from '../components/CardItemWithActions'


const ArticleItem = ({item, index}) => {
  const source = 'devto'
  return (
    <CardItemWithActions
      source={source}
      index={index}
      item={item}
      cardItem={(
        <>
          <CardLink link={item.url} analyticsSource="devto">
            {item.title}
          </CardLink>
          <p className="rowDescription">
            <span className="rowItem"><MdAccessTime className={"rowTitleIcon"} />{format(new Date(item.published_at))}</span>
            <span className="rowItem"><BiCommentDetail className={"rowTitleIcon"} />{item.comments_count} comments</span>
            <span className="rowItem"><AiOutlineLike className={"rowTitleIcon"} />{item.public_reactions_count} reactions</span>
          </p>

          <p className="rowDetails">
            {item.tag_list.map((tag, index) =>
              <span key={index} className={"rowItem rowLanguage gh-language-" + tag.toLowerCase()}>{tag}</span>

            )
            }
          </p>
        </>
      )}
    />
  )
}



function DevToCard() {
  const preferences = useContext(PreferencesContext)
  const { userSelectedTags } = preferences

  const [refresh, setRefresh] = useState(true)

  useEffect(() => {
    setRefresh(!refresh)
  }, [userSelectedTags])

  const fetchArticles = async () => {

    const promises = userSelectedTags.map(tag => {
      if (tag.devtoValues) {
        return devtoApi.getArticles(tag.devtoValues[0])
      }
      return []
    })

    const results = await Promise.allSettled(promises)
    return results.map(res => {
      let value = res.value
      if (res.status === 'rejected') {
        value = []
      }
      return value
    }).flat().sort((a, b) => b.public_reactions_count - a.public_reactions_count)

  }

  const renderArticles = (articles) => {
    return articles.map((item, index) => (
      <ArticleItem item={item} index={index} />
    ))
  }

  return (

    <CardComponent
      icon={<FaDev className="blockHeaderIcon blockHeaderWhite" />}
      title={"DevTo"}
    >
      <ListComponent
        fetchData={fetchArticles}
        renderData={renderArticles}
        refresh={refresh}
      />
    </CardComponent>
  )
}

export default DevToCard