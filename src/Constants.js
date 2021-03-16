import HNCard from "./cards/HNCard";
import DevToCard from "./cards/DevToCard";
import ConferencesCard from "./cards/ConferencesCard";
import JobsCard from "./cards/JobsCard";
import ReposCard from "./cards/ReposCard";

const APP = {
  name: 'Hackertab.dev',
  slogan: '— Stay updated with the new technology and trends',
  repository: 'https://github.com/medyo/hackertab.dev',
  ref: 'ref=hackertab',
  contactEmail: 'hello@hackertab.dev',
  maxCardsPerRow: 4
}

const SUPPORTED_TAGS = [
  {
    value: 'javascript', label: 'Javascript',
    githubValues: ['javascript'], confsValues: ['javascript'],
    stackoverflowValues: ['javascript'], devtoValues: ['javascript']
  },
  {
    value: 'python', label: 'Python',
    githubValues: ['python'], confsValues: ['python'],
    stackoverflowValues: ['python'], devtoValues: ['python']
  },
  {
    value: 'ruby', label: 'Ruby',
    githubValues: ['ruby'], confsValues: ['ruby'],
    stackoverflowValues: ['ruby'], devtoValues: ['ruby']
  },
  {
    value: 'java', label: 'Java',
    githubValues: ['java'], confsValues: ['java'],
    stackoverflowValues: ['java'], devtoValues: ['java']
  },
  {
    value: 'go', label: 'Go',
    githubValues: ['go'], confsValues: ['go'],
    stackoverflowValues: ['go'], devtoValues: ['go']
  },
  {
    value: 'typescript', label: 'Typescript',
    githubValues: ['typescript'], stackoverflowValues: ['typescript'],
    devtoValues: ['typescript']
  },
  {
    value: 'php', label: 'Php',
    githubValues: ['php'], confsValues: ['php'],
    stackoverflowValues: ['php'], devtoValues: ['php']
  },
  {
    value: 'c++', label: 'C++',
    githubValues: ['c++'], stackoverflowValues: ['c++'],
    devtoValues: ['cpp']
  },
  {
    value: 'kotlin', label: 'Kotlin',
    githubValues: ['kotlin'], stackoverflowValues: ['kotlin'],
    devtoValues: ['kotlin']
  },
  {
    value: 'objective-c', label: 'Objective-C',
    githubValues: ['objective-c'], stackoverflowValues: ['objective-c'],
    devtoValues: ['objectivec']
  },
  {
    value: 'devops', label: 'Devops',
    confsValues: ['devops'], stackoverflowValues: ['devops'],
    devtoValues: ['devops']
  },
  {
    value: 'swift', label: 'Swift',
    githubValues: ['swift'], confsValues: ['ios'],
    stackoverflowValues: ['swift'], devtoValues: ['swift']
  },
  {
    value: 'android', label: 'Android',
    confsValues: ['android'], stackoverflowValues: ['android'],
    devtoValues: ['android']
  },
  {
    value: 'machine-learning', label: 'Machine learning',
    stackoverflowValues: ['machine-learning'], devtoValues: ['machinelearning']
  },
  {
    value: 'data-science', label: 'Data science',
    confsValues: ['data'], stackoverflowValues: ['data-science'],
    devtoValues: ['datascience']
  },
  {
    value: 'artificial-intelligence', label: 'Artificial intelligence',
    confsValues: ['data'], stackoverflowValues: ['artificial-intelligence'],
    devtoValues: ['artificialintelligence']
  },
  {
    value: 'r', label: 'R',
    githubValues: ['r'], stackoverflowValues: ['r'],
    devtoValues: ['r']
  },
  {
    value: 'rust', label: 'Rust',
    githubValues: ['rust'], stackoverflowValues: ['rust'],
    devtoValues: ['rust']
  },
  {
    value: 'c', label: 'C',
    githubValues: ['C'], stackoverflowValues: ['C'],
    devtoValues: ['C']
  },
  {
    value: 'csharp', label: 'C#',
    githubValues: ['csharp'], stackoverflowValues: ['csharp'],
    devtoValues: ['csharp']
  },
  {
    value: 'elixir', label: 'Elixir',
    githubValues: ['elixir'], stackoverflowValues: ['elixir'],
    devtoValues: ['elixir']
  },
  {
    value: 'erlang', label: 'Erlang',
    githubValues: ['erlang'], stackoverflowValues: ['erlang'],
    devtoValues: ['erlang']
  },
]

export const LOCAL_CONFIGURATION = {
  supportedTags: SUPPORTED_TAGS
}


export const SUPPORTED_CARDS = [
  { value: 'github', analyticsTag: 'repos', label: 'Github repositories', component: ReposCard },
  { value: 'jobs', analyticsTag: 'jobs', label: 'Featured jobs', component: JobsCard },
  { value: 'hackernews', analyticsTag: 'hackernews', label: 'Hackernews', component: HNCard },
  { value: 'conferences', analyticsTag: 'events', label: 'Upcoming events', component: ConferencesCard },
  { value: 'devto', analyticsTag: 'devto', label: 'DevTo', component: DevToCard },
]


export const LS_PREFERENCES_KEY = "hackerTabPrefs"

export {
  APP
} 
