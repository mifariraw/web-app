export async function likeEvent(id: string) {
  await fetch(`/api/event/${id}/like-event`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function unlikeEvent(id: string) {
  await fetch(`/api/event/${id}/unlike-event`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}