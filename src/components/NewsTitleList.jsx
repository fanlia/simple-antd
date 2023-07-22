
import NewsTitle from './NewsTitle'

export default ({ configs }) => {

  return (
    <>
    {configs.map((d, i) => <NewsTitle config={d} key={i} />)}
    </>
  )
}
