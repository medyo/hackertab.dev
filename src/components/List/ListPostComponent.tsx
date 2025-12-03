import { Article } from 'src/types'
import { ListComponent, ListComponentPropsType } from './ListComponent'

export function ListPostComponent(props: ListComponentPropsType<Article>) {
  return <ListComponent<Article> {...props} />
}
