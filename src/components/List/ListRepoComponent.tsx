import { Repository } from 'src/types'
import { ListComponent, ListComponentPropsType } from './ListComponent'

export function ListRepoComponent(props: ListComponentPropsType<Repository>) {
  return <ListComponent<Repository> {...props} />
}
