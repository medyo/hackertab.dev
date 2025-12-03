import { Conference } from 'src/types'
import { ListComponent, ListComponentPropsType } from './ListComponent'

export function ListConferenceComponent(props: ListComponentPropsType<Conference>) {
  return <ListComponent<Conference> {...props} />
}
