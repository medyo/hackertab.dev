import React, { useState, useReducer, useLayoutEffect, useEffect, useContext } from "react";
import './App.css';
import { CgTab } from 'react-icons/cg';
import { BsMoon } from "react-icons/bs"
import { IoMdSunny } from "react-icons/io"
import { BsFillGearFill } from "react-icons/bs"
import SettingsModal from "./settings/SettingsModal";
import { PreferencesProvider } from './preference/PreferencesContext';
import ConfigurationContext from './configuration/ConfigurationContext';
import { RiCodeSSlashFill } from "react-icons/ri"
import { APP, LS_PREFERENCES_KEY, SUPPORTED_CARDS } from './Constants';
import { BsFillBookmarksFill } from "react-icons/bs"
import AppStorage from './services/localStorage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import DataSourcePage from './pages/DataSourcePage';
import Footer from "./components/Footer";
import UserTags from "./components/UserTags";
import { Grid, Col, Row } from 'react-styled-flexboxgrid'
import { ThemeProvider } from 'styled-components'
import AppReducer from "./preference/AppReducer";
import { ReactComponent as HackertabLogo } from './logo.svg';
import { trackPageView, trackThemeChange } from "./utils/Analytics"
import BookmarksSidebar from './bookmark/BookmarksSidebar'

function App() {

  const { supportedTags } = useContext(ConfigurationContext)


  const [themeIcon, setThemeIcon] = useState(<BsMoon />)
  const [showSettings, setShowSettings] = useState(false)
  const [showSideBar, setShowSideBar] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  const [state, dispatcher] = useReducer(AppReducer, {
    userSelectedTags: supportedTags.filter((t) => t.value === "javascript"),
    userBookmarks: [],
    theme: "dark",
    openLinksNewTab: true,
    cards: [
      { id: 0, name: "github" },
      { id: 1, name: "jobs" },
      { id: 2, name: "devto" },
      { id: 3, name: "conferences" },
    ]
  }, (initialState) => {
    try {
      let preferences = AppStorage.getItem(LS_PREFERENCES_KEY)
      if (preferences) {
        preferences = JSON.parse(preferences)
        return { ...initialState, ...preferences }
      }
    }
    catch (e) { }
    return initialState
  })

  useLayoutEffect(() => {
    document.body.classList.add(state.theme)
  }, [])

  useEffect(() => {
    if (currentPage != 'home') {
      trackPageView(currentPage)
    }
  }, [currentPage])

  useLayoutEffect(() => {

    trackThemeChange(state.theme)

    if (state.theme === 'light') {
      document.body.classList.replace('dark', state.theme)
      setThemeIcon(<BsMoon />)
    } else if (state.theme === 'dark') {
      document.body.classList.replace('light', state.theme)
      setThemeIcon(<IoMdSunny />)
    }
  }, [state.theme])

  const onThemeChange = () => {
    dispatcher({ type: 'toggleTheme' })
  }

  const onSourceCodeClick = () => {
    window.open(APP.repository, "_blank")
  }

  const onSettingsClick = () => {
    setShowSettings(true)
  }

  const gridTheme = {
    flexboxgrid: {
      gridSize: APP.maxCardsPerRow, // columns
      gutterWidth: 1, // rem
      outerMargin: 0,
    }
  }

  const BookmarksBadgeCount = () => {
    return (
      state.userBookmarks.length > 0 ?
        state.userBookmarks.length < 10 ?
          <span className="badgeCount">{state.userBookmarks.length}</span> :
          <span className="badgeCount">+9</span> :
        null
    )
  }

  const renderHomePage = () => {
    return (
      <PreferencesProvider value={{ ...state, dispatcher: dispatcher }}>
        <div className="App">
          <SettingsModal
            showSettings={showSettings}
            setShowSettings={setShowSettings} />
          <header className="AppHeader">
            <span className="AppName">
              <i className="logo"><CgTab /></i> <HackertabLogo className="logoText" />
            </span>
            <div className="slogan">
              {APP.slogan}
            </div>
            <div className="extras">
              <button className="extraBtn" onClick={onSourceCodeClick}><RiCodeSSlashFill /></button>
              <button className="extraBtn" onClick={onSettingsClick}><BsFillGearFill /></button>
              <button className="extraBtn darkModeBtn" onClick={onThemeChange}>{themeIcon}</button>
              <button className="extraBtn" onClick={() => setShowSideBar(!showSideBar)}>
                <BsFillBookmarksFill />
                <BookmarksBadgeCount />
              </button>
            </div>
            <div className="break"></div>
            <UserTags userSelectedTags={state.userSelectedTags} onAddClicked={onSettingsClick} />
          </header>
          <main className="AppContent">
            <ThemeProvider theme={gridTheme}>
              <Grid fluid={true}>
                <Row>
                  {state.cards.map((card, index) => (
                    <Col key={index} lg={state.cards.length / APP.maxCardsPerRow} sm={state.cards.length / 2} xs={state.cards.length}>
                      {React.createElement(SUPPORTED_CARDS.find((c) => c.value === card.name).component, { key: card.name })}
                    </Col>
                  ))}
                </Row>
              </Grid>
            </ThemeProvider>
          </main>
          <BookmarksSidebar showSidebar={showSideBar} onClose={() => setShowSideBar(false)} />

          <Footer setCurrentPage={setCurrentPage} />
        </div>

      </PreferencesProvider>
    )
  }

  const autoRouteContent = () => {
    let content = null;
    switch (currentPage) {
      case 'terms':
        content = <TermsPage goToPage={setCurrentPage} />
        break;
      case 'privacy':
        content = <PrivacyPage goToPage={setCurrentPage} />
        break;
      case 'dataSource':
        content = <DataSourcePage goToPage={setCurrentPage} />
        break;
      default:
        content = renderHomePage()
    }
    return content
  }

  return autoRouteContent()

}

export default App;
