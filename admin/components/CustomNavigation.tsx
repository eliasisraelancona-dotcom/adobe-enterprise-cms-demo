import { Divider } from '@keystar/ui/layout'
import {
  getHrefFromList,
  DeveloperResourcesMenu,
  NavContainer,
  NavFooter,
  NavList,
  NavItem,
} from '@keystone-6/core/admin-ui/components'
import type { NavigationProps } from '@keystone-6/core/admin-ui/components'

export function CustomNavigation({ lists }: NavigationProps) {
  // Insert a custom Org Chart link between Tags and Analytics Events
  const items: Array<JSX.Element> = []
  for (const list of lists) {
    items.push(
      <NavItem key={list.key} href={getHrefFromList(list)}>
        {list.label}
      </NavItem>
    )
    if (list.label === 'Tags') {
      items.push(
        <NavItem key="org-chart" href="/org-chart">
          Org Chart
        </NavItem>
      )
      items.push(
        <NavItem key="questions-triage" href="/questions-triage">
          Questions
        </NavItem>
      )
    }
  }

  return (
    <NavContainer>
      <NavList>
        <NavItem href="/">Dashboard</NavItem>
        <Divider />
        {items}
      </NavList>

      <NavFooter>
        <DeveloperResourcesMenu />
      </NavFooter>
    </NavContainer>
  )
}

