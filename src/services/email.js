
export const sendMail = (variables) => {
  const url = import.meta.env.VITE_API || 'http://localhost:4000'

  const query = `
  mutation(
    $options: JSON!
    $mail: JSON!
  ) {
    send_mail(
      options: $options
      mail: $mail
    )
  }
  `

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then(res => res.json())

}
