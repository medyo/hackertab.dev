
import React, { useEffect, useState, useContext } from 'react'
import CardComponent from "../components/CardComponent";
import ListComponent from "../components/ListComponent";
import { BiCommentDetail } from "react-icons/bi"
import { VscTriangleUp } from 'react-icons/vsc';
import PreferencesContext from '../preferences/PreferencesContext'
import CardLink from "../components/CardLink"
import CardItemWithActions from '../components/CardItemWithActions'
import producthuntApi from '../services/producthunt'
import ProductHuntPlaceholder from '../components/ProductHuntPlaceholder'

const ProductItem = ({ item, index, analyticsTag }) => {

  const { listingMode } = useContext(PreferencesContext)

  return (
    <CardItemWithActions
      source={'producthunt'}
      index={index}
      key={index}
      item={{ ...item, title: item.name }}
      cardItem={(
        <div className="phItem">
          <img className="phImage" src={item.thumbnail.url} />
          <div className="phContent">
            <CardLink link={item.url} appendRef={false} analyticsSource={analyticsTag}>
              {item.name}
            </CardLink>
            <p className="rowDescription">{item.tagline}</p>

            {listingMode === "normal" && 
              <p className="rowDetails">
              <span className="rowItem"><BiCommentDetail className="rowItemIcon" /> {item.commentsCount || 0} comments</span>
              {
                item.topics && item.topics.lenght > 0 ?
                  <span className="rowItem">{item.topics[0]}</span> :
                  null
              }
              </p>
            }
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

function ProductHuntCard({ label, icon, analyticsTag, withAds }) {
  const preferences = useContext(PreferencesContext)

  const { userSelectedTags } = preferences

  const [refresh, setRefresh] = useState(true)

  const fetchProducts = async () => {
    return await producthuntApi.getTodayProducts()
  }

  useEffect(() => {
    setRefresh(!refresh)
  }, [userSelectedTags])

  const renderItem = (item, index) => (
    <ProductItem item={item} key={`ph-${index}`} analyticsTag={analyticsTag} index={index} />
  )

  return (
    <CardComponent
      icon={<span className="blockHeaderIcon">{icon}</span>}
      link="https://www.producthunt.com/"
      title={label}>
      <ListComponent
        fetchData={fetchProducts}
        renderItem={renderItem}
        placeholder={<ProductHuntPlaceholder />}
        refresh={refresh}
        withAds={withAds}
      />
    </CardComponent>
  )
}

export default ProductHuntCard