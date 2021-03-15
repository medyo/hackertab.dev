
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


const ProductItem = ({ item, index }) => {
  const source = 'producthunt'

  return (
    <CardItemWithActions
      source={source}
      index={index}
      key={index}
      item={{ ...item, url: item.link }}
      cardItem={(
        <div class="phItem">
          <img className="phImage" src="https://ph-files.imgix.net/6784a94a-f76c-4918-ba43-e66de85574b5.gif?auto=compress&fm=webp&codec=mozjpeg&cs=strip&w=80&h=80&fit=max&frame=1" />
          <div className="phContent">
            <CardLink link={item.link} analyticsSource={source}>
              Hackertab
            </CardLink>
            <p className="rowDescription">Hottest programming trends right in your tab 🔥</p>

            <p className="rowDetails">
              <span className="rowItem"><BiCommentDetail className="rowItemIcon" /> 5 comments</span>
              <span className="rowItem">Chrome extensions</span>
            </p>
          </div>
          <div className="phVote">
            <VscTriangleUp className="rowItemIcon" />
            <span className="phVotesCount">151</span>
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
    const promises = userSelectedTags.map(tag => {
      if (tag['stackoverflowValues']) {
        return stackoverflowApi.getJobs(tag['stackoverflowValues'][0])
      }
      return []
    })
    const results = await Promise.allSettled(promises)

    return results.map((res, index) => {
      let value = res.value
      if (res.status === 'rejected') {
        value = []
      }
      return value.map(c => ({
        ...c, tag: userSelectedTags[index], date: new Date(c.isoDate)
      }))
    }).flat().sort((a, b) => b.date - a.date)
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