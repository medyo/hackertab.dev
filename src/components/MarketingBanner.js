const MarketingBanner = () => {

  var marketingHtml = "<div style='background-color:#D65736;text-align:center;border-radius:6px;padding: 12px 0;font-size: 20px'><a style='color:white;text-decoration:none' href='https://google.com'>" +
    "<img style='width: 38px;height:38px; vertical-align: middle;margin-right: 8px' " +
    "src='https://applets.imgix.net/https%3A%2F%2Fassets.ifttt.com%2Fimages%2Fchannels%2F1251268624%2Ficons%2Fmonochrome_large.png%3Fversion%3D0?w=240&h=240&auto=compress&s=ff0ca0f73580c29273679c3afdf98489'/>Hackertab is on <strong>ProductHunt!</strong> 😻 Show some love! 💖<a></div>"

  return (
    <div className='marketingBanner' dangerouslySetInnerHTML={{ __html: marketingHtml }} />
  )
}

export default MarketingBanner