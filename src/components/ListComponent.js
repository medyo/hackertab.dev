import React, { useState, useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";

function ListComponent({ fetchData, renderData, refresh }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetch = async () => {
    setLoading(true)
    setError(null)
    setItems([])
    try {
      const data = await fetchData()
      setItems(data)
    }
    catch(e) {
        setError(e)
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetch()
  }, [refresh])

  if (error) {
    return (<p className="errorMsg">{error.message}</p>)
  }

  return (
   <>
   {
          loading ?
            <div className="cardLoading">
              <BeatLoader color={"#A9B2BD"} loading={loading} size={15} className="loading" />
            </div> :
          (items && items.length > 0 ?
            renderData(items) :
            <p className="errorMsg">Could not find any content using the selected languages!</p>)
    }
   
   </>
  )
}

export default ListComponent
