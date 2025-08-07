import { gql, useQuery } from '@keystone-6/core/admin-ui/apollo'
import { PageContainer } from '@keystone-6/core/admin-ui/components'
import { Heading } from '@keystar/ui/typography'

const ORG_QUERY = gql`
  query OrgChart {
    users(where: { isActive: { equals: true } }, orderBy: { name: asc }) {
      id
      name
      email
      jobTitle
      manager { id name }
      reports { id name }
    }
  }
`

export default function OrgChartPage() {
  const { data, loading, error } = useQuery(ORG_QUERY)

  return (
    <PageContainer header={<Heading type="h3">Org Chart</Heading>}>
      {loading && <p>Loading…</p>}
      {error && <p>Error loading org chart</p>}
      {!loading && !error && (
        <div style={{ display: 'grid', gap: 16 }}>
          {data?.users?.map((user: any) => (
            <div key={user.id} style={{ border: '1px solid #eee', padding: 12, borderRadius: 8 }}>
              <strong>{user.name}</strong>
              {user.jobTitle ? <span> — {user.jobTitle}</span> : null}
              <div style={{ color: '#666', fontSize: 12 }}>{user.email}</div>
              <div style={{ marginTop: 8 }}>
                Manager: {user.manager ? user.manager.name : '—'}
              </div>
              <div>
                Reports: {user.reports?.length ? user.reports.map((r: any) => r.name).join(', ') : '—'}
              </div>
            </div>
          ))}
        </div>
      )}
    </PageContainer>
  )
}

