
import React, { useEffect, useState, useContext } from 'react'
import { SiProducthunt } from 'react-icons/si';
import CardComponent from "../components/CardComponent";
import ListComponent from "../components/ListComponent";
import stackoverflowApi from '../services/stackoverflow';
import { BiCommentDetail } from "react-icons/bi"
import { VscTriangleUp } from 'react-icons/vsc';
import PreferencesContext from '../preferences/PreferencesContext'
import CardLink from "../components/CardLink"
import CardItemWithActions from '../components/CardItemWithActions'
import producthuntApi from '../services/producthunt'

const ProductItem = ({ item, index }) => {
  const source = 'producthunt'

  return (
    <CardItemWithActions
      source={source}
      index={index}
      key={index}
      item={{ ...item, url: item.link }}
      cardItem={(
        <div className="phItem">
          <img className="phImage" src={item.thumbnail.url} />
          <div className="phContent">
            <CardLink link={item.url} appendRef={false} analyticsSource={source}>
              {item.name}
            </CardLink>
            <p className="rowDescription">{item.tagline}</p>

            <p className="rowDetails">
              <span className="rowItem"><BiCommentDetail className="rowItemIcon" /> {item.commentsCount || 0} comments</span>
              {
                item.topics && item.topics.lenght > 0 ?
                  <span className="rowItem">{item.topics[0]}</span> :
                  null
              }

            </p>
          </div>
          <div className="phVote">
            <VscTriangleUp className="rowItemIcon" />
            <span className="phVotesCount">{item.votesCount}</span>
          </div>

        </div>
      )}
    />
  )
}

function ProductHuntCard() {
  const preferences = useContext(PreferencesContext)

  const { userSelectedTags } = preferences

  const [refresh, setRefresh] = useState(true)

  const fetchProducts = async () => {
    return await producthuntApi.getTodayProducts()
  }

  useEffect(() => {
    setRefresh(!refresh)
  }, [userSelectedTags])

  const renderProducts = (jobs) => {
    return jobs.map((item, index) => <ProductItem item={item} index={index} />)
  }
  return (
    <CardComponent
      icon={<SiProducthunt className="blockHeaderIcon" color="#D65736" />}
      title={"ProductHunt"}
    >

      <ListComponent
        fetchData={fetchProducts}
        renderData={renderProducts}
        refresh={refresh}
      />
    </CardComponent>
  )
}

export default ProductHuntCard