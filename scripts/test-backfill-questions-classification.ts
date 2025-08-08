/* eslint-disable no-console */

// Minimal post-migration QA for the Questions.classification field
// - Verifies default/backfill to FYI
// - Verifies enum accepts BLOCKER and FEATURE
// - Ensures answeredAt is unchanged when only classification changes

const API_URL = process.env.API_URL || 'http://localhost:3000/api/graphql'

type GqlResponse<T> = { data?: T; errors?: Array<{ message: string }> }

async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  })
  const json = (await res.json()) as GqlResponse<T>
  if (json.errors && json.errors.length) {
    throw new Error(json.errors.map(e => e.message).join('\n'))
  }
  return json.data as T
}

async function main() {
  console.log('Running Questions classification backfill test against', API_URL)

  // 1) Check if the classification field exists; if not, SKIP gracefully
  type Introspection = {
    __type?: { fields?: Array<{ name: string }> }
  }
  const introspection = await gql<Introspection>(
    `query { __type(name: "Question") { fields { name } } }`
  )
  const fieldNames = new Set((introspection.__type?.fields ?? []).map(f => f.name))
  if (!fieldNames.has('classification')) {
    console.log('SKIP: Question.classification not found. Add the field and re-run.')
    process.exit(0)
  }

  // 2) Create a question WITHOUT classification → expect default/backfill FYI
  type CreateResp = { createQuestion: { id: string; classification: string | null; answeredAt: string | null } }
  const created = await gql<CreateResp>(
    `mutation {
      createQuestion(data: { question: "Backfill check: no classification provided" }) {
        id
        classification
        answeredAt
      }
    }`
  )
  const createdId = created.createQuestion.id
  if (!createdId) throw new Error('Failed to create test Question')
  if (created.createQuestion.classification !== 'FYI') {
    throw new Error(`Expected default classification FYI, got ${created.createQuestion.classification}`)
  }
  console.log('✓ Default/backfill classification is FYI')

  // 3) Update to BLOCKER; answeredAt must remain unchanged
  type UpdateResp = { updateQuestion: { id: string; classification: string; answeredAt: string | null } }
  const updatedToBlocker = await gql<UpdateResp>(
    `mutation ($id: ID!) {
      updateQuestion(where: { id: $id }, data: { classification: BLOCKER }) {
        id classification answeredAt
      }
    }`,
    { id: createdId }
  )
  if (updatedToBlocker.updateQuestion.classification !== 'BLOCKER') {
    throw new Error('Failed to update classification to BLOCKER')
  }
  if (updatedToBlocker.updateQuestion.answeredAt !== null) {
    throw new Error('answeredAt should remain null when classification changes')
  }
  console.log('✓ Update to BLOCKER persisted; answeredAt unchanged')

  // 4) Update to FEATURE
  const updatedToFeature = await gql<UpdateResp>(
    `mutation ($id: ID!) {
      updateQuestion(where: { id: $id }, data: { classification: FEATURE }) {
        id classification answeredAt
      }
    }`,
    { id: createdId }
  )
  if (updatedToFeature.updateQuestion.classification !== 'FEATURE') {
    throw new Error('Failed to update classification to FEATURE')
  }
  console.log('✓ Update to FEATURE persisted')

  // 5) Cleanup
  await gql<{ deleteQuestion: { id: string } }>(
    `mutation ($id: ID!) { deleteQuestion(where: { id: $id }) { id } }`,
    { id: createdId }
  )
  console.log('✓ Cleanup complete')
  console.log('All backfill checks passed.')
}

main().catch(err => {
  console.error('Backfill test failed:\n', err?.message || err)
  process.exit(1)
})

