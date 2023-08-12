
export const testProxy = (proxy) => {
  const url = import.meta.env.VITE_API || 'http://localhost:4000'

  const query = `
  query(
    $url: JSON!
  ) {
    page(
      url: $url
    ) {
      text(selector: "head title")
    }
  }
  `

  const variables = {
    url: {
      url: 'https://www.baidu.com',
      proxy,
    },
  }

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
