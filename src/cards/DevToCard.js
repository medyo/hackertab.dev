import React, { useContext, useState, useEffect } from 'react'
import { FaDev } from 'react-icons/fa';
import devtoApi from '../services/devto'
import CardComponent from "./CardComponent"
import ListComponent from "./ListComponent"
import { format } from 'timeago.js';
import PreferencesContext from '../contexts/PreferencesContext'
import CardLink from "./CardLink"
import { BiCommentDetail } from 'react-icons/bi';
import { MdAccessTime } from "react-icons/md"
import { AiOutlineLike } from "react-icons/ai"


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
    return articles.map((article, index) => (
      <div key={index} className="blockRow">
        <CardLink link={article.url} analyticsSource="devto">
          {article.title}
        </CardLink>
        <p className="rowDescription">
          <span className="rowItem"><MdAccessTime className={"rowTitleIcon"} />{format(new Date(article.published_at))}</span>
          <span className="rowItem"><BiCommentDetail className={"rowTitleIcon"} />{article.comments_count} comments</span>
          <span className="rowItem"><AiOutlineLike className={"rowTitleIcon"} />{article.public_reactions_count} reactions</span>
        </p>

        <p className="rowDetails">
          {article.tag_list.map((tag, index) =>
            <span key={index} className={"rowItem rowLanguage gh-language-" + tag.toLowerCase()}>{tag}</span>

          )
          }
        </p>
      </div>
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