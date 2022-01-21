var _carbonads = {
  init: function (where, force_serve) {
    _carbon_where = null
    if (where) _carbon_where = where
    var placement = this.getUrlVar('placement'),
      baseurl = this.getUrlVar('cd') ? this.getUrlVar('cd') : 'srv.carbonads.net',
      protocol = this.getUrlVar('protocol') ? this.getUrlVar('protocol') + ':' : 'https:',
      serve = this.getServe(force_serve ? force_serve : this.getUrlVar('serve'), placement)
    var forceUrlPreview = this.getUrlVar('_bsa_url_preview', window.location.href)
    if (forceUrlPreview) {
      var previewData = JSON.parse(decodeURIComponent(forceUrlPreview))
      setTimeout(function () {
        _carbonads_go({
          ads: [
            Object.assign({}, previewData, {
              zonekey: serve,
              statlink: previewData.link.replace(/^(http:|https:)/gm, ''),
            }),
            {},
          ],
        })
      }, 0)
    } else {
      var pro = document.createElement('script')
      pro.id = '_carbonads_projs'
      pro.type = 'text/javascript'
      pro.src = this._buildSrvUrl(
        protocol +
          '//' +
          baseurl +
          '/ads/' +
          serve +
          '.json?segment=placement:' +
          placement +
          '&callback=_carbonads_go'
      )
      document.getElementsByTagName('head')[0].appendChild(pro)
    }
  },
  _buildSrvUrl: function (base) {
    var forcebanner = this.getUrlVar('bsaforcebanner', window.location.href),
      ignore = this.getUrlVar('bsaignore', window.location.href),
      forwardedip = this.getUrlVar('bsaforwardedip', window.location.href)
    ignoretargeting = this.getUrlVar('bsaignoretargeting', window.location.href)
    if (forcebanner) base += '&forcebanner=' + forcebanner
    if (ignore) base += '&ignore=' + ignore
    if (ignoretargeting) base += '&ignoretargeting=' + ignore
    if (forwardedip) base += '&forwardedip=' + forwardedip
    var ck = ''
    try {
      ck = decodeURIComponent(document.cookie)
    } catch (e) {}
    var day = ck.indexOf('_bsap_daycap='),
      life = ck.indexOf('_bsap_lifecap=')
    day =
      day >= 0
        ? ck
            .substring(day + 12 + 1)
            .split(';')[0]
            .split(',')
        : []
    life =
      life >= 0
        ? ck
            .substring(life + 13 + 1)
            .split(';')[0]
            .split(',')
        : []
    if (day.length || life.length) {
      var freqcap = []
      for (var i = 0; i < day.length; i++) {
        var adspot = day[i]
        for (var found = -1, find = 0; find < freqcap.length && found == -1; find++)
          if (freqcap[find][0] == adspot) found = find
        if (found == -1) freqcap.push([adspot, 1, 0])
        else freqcap[found][1]++
      }
      for (var i = 0; i < life.length; i++) {
        var adspot = day[i]
        for (var found = -1, find = 0; find < freqcap.length && found == -1; find++)
          if (freqcap[find][0] == adspot) found = find
        if (found == -1) freqcap.push([adspot, 0, 1])
        else freqcap[found][2]++
      }
      for (var i = 0; i < freqcap.length; i++)
        freqcap[i] = freqcap[i][0] + ':' + freqcap[i][1] + ',' + freqcap[i][2]
      if (freqcap.length) base += '&freqcap=' + encodeURIComponent(freqcap.join(';'))
    }
    return base
  },
  getServe: function (serve, placement) {
    var r = new Array()
    r['getbootstrapcom'] = 'CKYIKKJL'
    r['fontawesome'] = 'CKYIV5QM'
    r['vuetifyjscom'] = 'CKYI5KQY'
    r['abuseipdbcomjw'] = 'CKYIE53Y'
    r['stocksnapio'] = 'CKYIV23Y'
    r['uplabscom'] = 'CKYIP5QW'
    r['mongoosejscom'] = 'CKYIL27I'
    r['semanticuicom'] = 'CKYIKK7M'
    r['rubydocorg'] = 'CKYIKKQN'
    r['kuulaco'] = 'CKYIPKJI'
    r['joomlaorg'] = 'CKYI553E'
    r['kkorgcooltools'] = 'CKYICKJN'
    r['framework7io'] = 'CKYIE5QJ'
    r['bestfolioscom'] = 'CKYIV23I'
    r['tobiasahlincom'] = 'CKYIEKQN'
    r['mindsparklemagcom'] = 'CKYIV2JM'
    r['simpledesktopscom'] = 'CKYIV53I'
    r['thinksterio'] = 'CKYILK37'
    r['colormindio'] = 'CKYIV27W'
    r['adonisjscom'] = 'CKYIL23I'
    r['openprocessingorg'] = 'CKYIP5QL'
    r['passportjsorg'] = 'CKYI523M'
    r['pugjsorg'] = 'CKYILKQ7'
    r['gormio'] = 'CK7DTKJY'
    r['materialpalettecom'] = 'CK7DTKJM'
    r['murzebe'] = 'CKYIK27U'
    r['learnshayhowecom'] = 'CKYILKJL'
    r['landbookcom'] = 'CKYIP2QM'
    r['logobookcom'] = 'CKYIV2QE'
    r['html2canvashertzencom'] = 'CKYIL2JL'
    r['colorzillacomgradienteditor'] = 'CK7DT23W'
    r['rvmio'] = 'CKYI55QN'
    r['wedistillio'] = 'CKYIP2JM'
    r['silviomoretogithubiobootstrapsel'] = 'CKYIKK7I'
    r['cssreferenceio'] = 'CKYIK2JU'
    r['searchcodecom'] = 'CKYIEKQE'
    r['tachyonsio'] = 'CKYIE2QU'
    r['w3bincom'] = 'CKYIEK3W'
    r['mjtsaicom'] = 'CKYIC53E'
    r['hookrio'] = 'CKYILKQI'
    r['bradfrostwebcom'] = 'CKYIV5QE'
    r['thecodebarbariancom'] = 'CKYI5K3Y'
    r['toolsandtoysnet'] = 'CKYICK7Y'
    r['echolabstackcom'] = 'CKYILKQM'
    r['coolx10com'] = 'CKYIK2JM'
    r['csswizardrycom'] = 'CKYIK5QI'
    r['bitsofcode'] = 'CKYIL23L'
    r['hexoio'] = 'CKYIL2QU'
    r['gitguide'] = 'CKYI5K3W'
    r['zealdocsforwindowsorg'] = 'CKYIE53M'
    r['instantlogosearchcom'] = 'CKYIP23I'
    r['callmenickcom'] = 'CKYI52J7'
    r['marksheetio'] = 'CKYIE53J'
    r['saedsayadcom'] = 'CKYIL5QI'
    r['alertifyjs'] = 'CKYI55QJ'
    r['sourcemakingcom'] = 'CK7DTKJJ'
    r['colorzillacom'] = 'CKYIK53N'
    r['jonrohancodes'] = 'CKYIL23E'
    r['muicsscom'] = 'CKYIL5QW'
    r['glebbahmutovcom'] = 'CKYI5K7U'
    r['devdojocom'] = 'CKYIL23U'
    r['bloggetbootstrapcom'] = 'CKYIKKJJ'
    r['baconipsumcom'] = 'CKYIPKJU'
    r['uijarcom'] = 'CKYIP27Y'
    r['signature'] = 'CKYIC5QU'
    r['drushcommandscom'] = 'CKYIE27N'
    r['expogetbootstrapcom'] = 'CKYIKKQ7'
    r['cubicbeziercom'] = 'CKYIPKJ7'
    r['syntaxdbcom'] = 'CKYILK3I'
    r['listjscom'] = 'CKYIKK7W'
    r['learninglaravel'] = 'CKYI527J'
    r['blivesta'] = 'CKYI5K7I'
    r['daverupertcombiz'] = 'CKYIC27Y'
    r['ui-cloudcom'] = 'CKYIPK3E'
    r['ohshitgitcom'] = 'CK7DTKQE'
    r['contrastratiocom'] = 'CK7DT2QJ'
    r['frontendfrontcom'] = 'CKYIEKJU'
    r['hiliosgithubiojQuerycountdown'] = 'CKYIEKJM'
    r['sassmeister'] = 'CKYIK2JN'
    r['mockitoorg'] = 'CKYIL5QY'
    r['ponyfoocom'] = 'CKYI553L'
    r['pxlnv'] = 'CKYICKJW'
    r['tutorialzinecom'] = 'CKYIK5QM'
    r['flexboxgridcom'] = 'CKYILK3N'
    r['milligramgithubio'] = 'CKYIE23J'
    r['uispacenet'] = 'CKYIVK7E'
    r['wildlyinaccuratecom'] = 'CKYIKK3U'
    r['htmlreferenceio'] = 'CKYI553U'
    r['realisticshots'] = 'CKYIPK37'
    r['wowwebcouk'] = 'CKYIP237'
    r['compassstyleorg'] = 'CKYI52QY'
    r['astronautwebco'] = 'CKYIK23W'
    r['botmanio'] = 'CKYI52QL'
    r['deanattalicom'] = 'CKYIL5Q7'
    r['numeraljscom'] = 'CKYIKK7Y'
    r['leaveroume'] = 'CKYIK5QN'
    r['glotio'] = 'CKYIE2JM'
    r['davepaquettecom'] = 'CK7DTKJN'
    r['zealdocsorg'] = 'CKYIE53W'
    r['catalinred'] = 'CKYIE2QY'
    r['graineditcom'] = 'CKYIPK3M'
    r['materialthemecom'] = 'CK7DT23I'
    r['worktimercouk'] = 'CKYIC2JM'
    r['clrscc'] = 'CKYIV2QL'
    r['osvaldasinfo'] = 'CKYI5K77'
    r['codrops'] = 'CKYIK53I'
    r['bootflat'] = 'CKYI5KJY'
    r['littlesnippetsnet'] = 'CKYIEK7W'
    r['iconbroscom'] = 'CKYIPK3I'
    r['kodhuscom'] = 'CKYIE27E'
    r['dpilv'] = 'CKYIPK7N'
    r['jaysalvatcom'] = 'CKYI5K7M'
    r['typezebracom'] = 'CKYIVK7L'
    r['jsperfcom'] = 'CKYIEKJN'
    r['instafeedjscom'] = 'CKYIEK7I'
    r['pushjsorg'] = 'CKYI553I'
    r['logospirecom'] = 'CKYIP23J'
    r['wwwsiiimplecom'] = 'CKYIPK3J'
    r['hugogiraudelcom'] = 'CKYIKKQY'
    r['css3generatorcom'] = 'CKYIK5QU'
    r['basscsscom'] = 'CKYIPKQN'
    r['museresourcescom'] = 'CKYIV2JN'
    r['jquerycardscom'] = 'CKYIE23I'
    r['sketchshortcutscom'] = 'CKYIPKJY'
    r['js2coffee'] = 'CKYI553W'
    r['danielmallcom'] = 'CKYIVKQW'
    r['aisleonenet'] = 'CKYIV53W'
    r['discordserverscom'] = 'CK7DTKQJ'
    r['coolphptoolscom'] = 'CKYIE27Y'
    r['perfectionkillscom'] = 'CKYIKK3L'
    r['degoesnet'] = 'CKYIC53J'
    r['sketchapprocks'] = 'CKYIP2JE'
    r['jxnblkcom'] = 'CKYIPKQM'
    r['patternifycom'] = 'CK7DT5QE'
    r['githubcombevacqua'] = 'CKYI5KJW'
    r['ifontyoucom'] = 'CKYIPKJL'
    r['1000hzgithubio'] = 'CKYIE5QM'
    r['pastiebincom'] = 'CKYI5277'
    r['colintohcom'] = 'CKYIEKQY'
    r['cssguidelines'] = 'CKYIK53L'
    r['simonholywellcom'] = 'CKYIK23E'
    r['gedblogcom'] = 'CKYIV5QL'
    r['lavaliteorg'] = 'CKYI55QY'
    r['zerosixthree'] = 'CKYI527L'
    r['browserhackscom'] = 'CKYIKKJY'
    r['clusterizejsorg'] = 'CKYIE53N'
    r['resourcecardscom'] = 'CKYIP2QI'
    r['designerlynxco'] = 'CKYIPK3L'
    r['bootplycom'] = 'CKYIKKJW'
    r['imagehoverio'] = 'CKYIL2JM'
    r['goratchetcom'] = 'CKYIK2QJ'
    r['polrprojectorg'] = 'CK7DTK7W'
    r['fittextjscom'] = 'CKYIK27M'
    r['thezinxcom'] = 'CKYIV237'
    r['visualizingeconomicscom'] = 'CKYIC237'
    r['css3testcom'] = 'CKYIEK7U'
    r['trentwaltoncom'] = 'CKYI52QM'
    r['thenewsprint'] = 'CKYICKJJ'
    r['meanthemescom'] = 'CKYIK23Y'
    r['mclearcouk'] = 'CKYIVK37'
    r['bestaboutpagescom'] = 'CKYIVKJJ'
    r['markgoodyearcom'] = 'CKYIKKJU'
    r['wwwwireframeshowcasecom'] = 'CKYIV27U'
    r['scoopthemes'] = 'CKYIK2JE'
    r['mrmrsio'] = 'CKYIPKQI'
    r['lostechiescom'] = 'CKYIE53U'
    r['bitshadowgithubio'] = 'CKYILK7E'
    r['reactparts'] = 'CKYIL5QU'
    r['letteringjscom'] = 'CKYIKK3W'
    r['wwwcomicsanscriminalcom'] = 'CKYIV2JU'
    r['inspirationmobiletumblrcom'] = 'CKYIPKJJ'
    r['wtfforms'] = 'CKYI527E'
    r['jsternet'] = 'CKYI5KQM'
    r['hakaselogsme'] = 'CK7DTK7L'
    r['thinkandbuildit'] = 'CKYIKK77'
    r['anthonyterrien'] = 'CKYI5KJN'
    r['hildebertocom'] = 'CK7DTK3U'
    r['verynicesitescom'] = 'CKYIV23J'
    r['usabilitycountscom'] = 'CKYIC27L'
    r['wwwhereio'] = 'CKYIPK7E'
    r['blogeppzeu'] = 'CKYIEKQI'
    r['responsivebp'] = 'CKYIK2QM'
    r['philgrcom'] = 'CKYIK237'
    r['iconfindercom'] = 'CKYIP5QI'
    r['fontscom'] = 'CKYIP5QJ'
    r['emmetreview'] = 'CKYIE23Y'
    r['davidwalshname'] = 'CKYI5KQL'
    r['codedailyio'] = 'CKYIEK7J'
    r['grapesjscom'] = 'CKYI5KJU'
    r['krasimirtsonevcom'] = 'CKYIE2QI'
    r['saeedalipoorgithubioicono'] = 'CKYIK53W'
    r['sequencejscom'] = 'CKYIE2QM'
    r['ignorethecodenet'] = 'CKYIC23J'
    r['rocketinknet'] = 'CKYIC2QJ'
    r['jmarbachcom'] = 'CKYICKQM'
    r['wwwtech-thoughtsnet'] = 'CKYIC2JU'
    r['blogtdwrightcouk'] = 'CK7DT2QL'
    r['typeplatecom'] = 'CKYIK27W'
    r['aspectratio'] = 'CK7DTKQI'
    r['www6ixpassionscom'] = 'CKYIC2JN'
    r['chriswhartonme'] = 'CKYILKJM'
    r['lukyvjgithubiofamilyscss'] = 'CKYIE2J7'
    if (
      this.isset(r[placement]) &&
      (serve == 'CVYD42T' || serve == 'CVYD42E' || serve == 'C6AILKT')
    )
      return r[placement]
    else if (serve == 'CVYD42T' || serve == 'CVYD42E' || serve == 'C6AILKT') return 'CKYICKQI'
    else return serve
  },
  getUrlVar: function (name, target) {
    ;(target =
      typeof target !== 'undefined' ? target : document.getElementById('_carbonads_js').src),
      (name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]'))
    var regexS = '[\\?&]' + name + '=([^&#]*)'
    var regex = new RegExp(regexS)
    var results = regex.exec(target)
    if (results == null) return ''
    else return results[1]
  },
  isset: function (v) {
    return typeof v !== 'undefined' && v != null
  },
  nonempty: function (v) {
    return this.isset(v) && v != ''
  },
  refresh: function () {
    _carbonads.gotback = false
    this.remove(document.getElementById('_carbonads_projs'))
    this.remove(document.getElementById('carbonads'))
    this.init()
  },
  reload: function (where, force_serve) {
    _carbonads.gotback = false
    this.remove(document.getElementById('_carbonads_projs'))
    this.init(where, force_serve)
  },
  remove: function (el) {
    if (typeof el !== 'undefined' && el != null) el.parentNode.removeChild(el)
  },
  htmlEncode: function (v) {
    return v
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\//g, '&#x2F;')
  },
}
function _carbonads_go(b) {
  if (!b) return
  var ad = b['ads'][0],
    link,
    fulllink,
    image,
    description,
    time = Math.round(Date.now() / 10000) | 0
  var placement = _carbonads.getUrlVar('placement')
  var serve = _carbonads.getUrlVar('serve')
  if (typeof ad.custom_css != 'undefined') {
    var css = document.createElement('style')
    css.innerHTML = ad.custom_css
    document
      .getElementById('_carbonads_js')
      .parentNode.insertBefore(css, document.getElementById('_carbonads_js'))
  }
  if (ad.html != null) {
    var ad_html = JSON.parse(ad.html)
    ;(ad.image = ad_html.image),
      (ad.statlink = ad_html.statlink),
      (ad.description = ad_html.description),
      (ad.pixel = ad_html.pixel)
    ad.click_redir = ad_html.click_redir
  }
  if (
    !_carbonads.nonempty(ad.statlink) &&
    (!(
      _carbonads.nonempty(ad.fallbackImage) &&
      _carbonads.nonempty(ad.fallbackLink) &&
      _carbonads.nonempty(ad.fallbackTitle)
    ) ||
      !_carbonads.nonempty(ad.fallbackZoneKey)) &&
    !(
      _carbonads.nonempty(ad.fallbackImage) &&
      _carbonads.nonempty(ad.fallbackLink) &&
      _carbonads.nonempty(ad.fallbackTitle)
    )
  ) {
    var fallbackKey = _carbonads.nonempty(ad.fallbackZoneKey) ? ad.fallbackZoneKey : 'CK7DT53I'
    if (_carbonads.gotback === fallbackKey) return
    _carbonads.gotback = fallbackKey
    var fallback = document.createElement('script')
    fallback.type = 'text/javascript'
    fallback.id = '_carbonads_fallbackjs'
    fallback.src = _carbonads._buildSrvUrl(
      'https://srv.carbonads.net/ads/' +
        fallbackKey +
        '.json?segment=placement:' +
        placement +
        '&callback=_carbonads_go'
    )
    if (ad.fallbackTitle !== 'hide') {
      document.getElementsByTagName('head')[0].appendChild(fallback)
      _carbonads.remove(document.getElementById('_carbonads_fallbackjs'))
    }
    return
  }
  image = _carbonads.isset(ad.logo)
    ? ad.logo
    : _carbonads.isset(ad.smallImage)
    ? ad.smallImage
    : _carbonads.isset(ad.image)
    ? ad.image
    : ad.fallbackImage
  link = _carbonads.isset(ad.statlink)
    ? ad.statlink.split('?encredirect=')
    : ad.fallbackLink.replace(/^(http:|https:)/gm, '')
  description = _carbonads.isset(ad.description)
    ? ad.description
    : _carbonads.isset(ad.title)
    ? ad.title
    : ad.fallbackTitle
  bgcolor = _carbonads.isset(ad.backgroundHoverColor) ? ad.backgroundHoverColor : null
  if (typeof link[1] != 'undefined' && _carbonads.isset(ad.statlink))
    fulllink =
      link[0] + '?segment=placement:' + placement + ';&encredirect=' + encodeURIComponent(link[1])
  else if (link[0].search('srv.buysellads.com') > 0 && _carbonads.isset(ad.statlink))
    fulllink = link[0] + '?segment=placement:' + placement + ';'
  else if (Array.isArray(link)) fulllink = link[0]
  else fulllink = link
  fulllink = fulllink.replace(/srv.buysellads.com/g, 'srv.carbonads.net')
  var el = document.createElement('span')
  el.innerHTML =
    '<span class="carbon-wrap"><a href="https:' +
    fulllink.replace('[timestamp]', time) +
    '" class="carbon-img" target="_blank" rel="noopener sponsored"><img src="' +
    image +
    '" alt="ads via Carbon" border="0"' +
    (_carbonads.isset(bgcolor)
      ? 'style="background:' +
        bgcolor +
        ';width:100px;padding: 30px 15px;box-sizing: content-box;" '
      : 'height="100" width="130"') +
    ' /></a><a href="https:' +
    fulllink.replace('[timestamp]', time) +
    '" class="carbon-text" target="_blank" rel="noopener sponsored">' +
    _carbonads.htmlEncode(description) +
    '</a></span>'
  if (!_carbonads.isset(ad.removecarbon))
    el.innerHTML +=
      '<a href="http://carbonads.net/?utm_source=' +
      placement +
      '&utm_medium=ad_via_link&utm_campaign=in_unit&utm_term=carbon" class="carbon-poweredby" target="_blank" rel="noopener sponsored">ads via Carbon</a>'
  if (typeof ad.pixel != 'undefined') {
    var pixels = ad.pixel.split('||')
    for (var j = 0; j < pixels.length; j++) {
      var pix = document.createElement('img')
      pix.src = pixels[j].replace('[timestamp]', time)
      pix.border = '0'
      pix.height = '1'
      pix.width = '1'
      pix.style.display = 'none'
      pix.alt = 'ads via Carbon'
      el.appendChild(pix)
    }
  }
  var n = document.getElementsByClassName('carbon-wrap')
  var fdiv = document.createElement('div')
  fdiv.id = n.length > 0 ? 'carbonads_' + n.length : 'carbonads'
  fdiv.appendChild(el)
  var carbonjs = document.getElementById('_carbonads_js')
  if (carbonjs != null)
    if (_carbonads.isset(_carbon_where)) _carbon_where.appendChild(fdiv)
    else carbonjs.parentNode.insertBefore(fdiv, carbonjs.nextSibling)
  var mw = document.querySelectorAll('.carbon-img > img')
  for (var i = 0; i < mw.length; i++) mw[i].style.maxWidth = '130px'
  _bsap_serving_callback(ad.bannerid, ad.zonekey, ad.freqcap)
  if (_carbonads.nonempty(ad.fallbackTitle) && !_carbonads.nonempty(ad.statlink)) {
    if (ad.fallbackTitle === 'hide') _carbonads.remove(document.getElementById('carbonads'))
  }
}
_carbonads.init()
window['_bsap_serving_callback'] = function (banner, zone, freqcap) {
  var append = function (w, data, days) {
    var c = document.cookie,
      i = c.indexOf(w + '='),
      existing = i >= 0 ? c.substring(i + w.length + 1).split(';')[0] + '%2C' : '',
      d = new Date()
    d.setTime(days * 3600000 + d)
    data = existing + data
    data = data.substring(0, 2048)
    document.cookie = w + '=' + data + '; expires=' + d.toGMTString() + '; SameSite=Lax; path=/'
  }
  if (freqcap) {
    append('_bsap_daycap', banner, 1)
    append('_bsap_lifecap', banner, 365)
  }
}
