import { gql, useQuery } from '@urql/next'
import Link from 'next/link'

const QUERY = gql`
  query QuestionsTriagePageQuery {
    questions(orderBy: { askedAt: desc }) {
      id
      question
      status
      askedAt
      answeredAt
      askedBy { id name email }
    }
  }
`

export default function QuestionsTriagePage() {
  const [{ data, fetching, error }] = useQuery({ query: QUERY })

  if (fetching) return <div style={{ padding: 24 }}>Loading…</div>
  if (error) return <div style={{ padding: 24, color: 'crimson' }}>{error.message}</div>

  const items = data?.questions ?? []

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 12 }}>Questions</h1>
      <p style={{ marginBottom: 20 }}>Capture audience questions and return to answer later.</p>

      <div style={{ marginBottom: 16 }}>
        <Link href="/questions/create">New Question</Link>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {items.map((q: any) => (
          <div key={q.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <strong>Status: {q.status}</strong>
              <Link href={`/questions/${q.id}`}>Open</Link>
            </div>
            <div style={{ whiteSpace: 'pre-wrap' }}>{q.question}</div>
            <div style={{ fontSize: 12, color: '#555', marginTop: 8 }}>
              Asked {new Date(q.askedAt).toLocaleString()} {q.askedBy ? `by ${q.askedBy.name} (${q.askedBy.email})` : ''}
              {q.answeredAt ? ` • Answered ${new Date(q.answeredAt).toLocaleString()}` : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

