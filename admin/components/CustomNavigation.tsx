import { Divider } from '@keystar/ui/layout'
import { Button } from '@keystar/ui/button'
import { gql, useMutation } from '@keystone-6/core/admin-ui/apollo'
import { useRouter } from '@keystone-6/core/admin-ui/router'
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
  const router = useRouter()
  const [endSession, { data: signoutData }] = useMutation(gql`
    mutation { endSession }
  `)

  if (signoutData?.endSession) {
    // Redirect to signin after successful signout
    router.push('/signin')
  }

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
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <DeveloperResourcesMenu />
          <Button
            size="small"
            prominence="low"
            onPress={() => endSession({})}
            aria-label="Sign out"
          >
            Sign out
          </Button>
        </div>
      </NavFooter>
    </NavContainer>
  )
}

