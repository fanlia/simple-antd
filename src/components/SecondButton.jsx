
import { useState, useEffect } from 'react'
import { Button } from 'antd'

export default ({ onTickEnd }) => {

  const [intervalId, setIntervalId] = useState(0)
  const [text, setText] = useState('自动刷新')

  const max = 60
  let i = max

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [])

  const handleClick = () => {

    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(0)
      setText(`自动刷新`)
    } else {
      setText(`${i}秒后刷新`)
      const nextIntervalId = setInterval(() => {
        i--
        setText(`${i}秒后刷新`)
        if (i < 1) {
          i = max
          if (typeof onTickEnd === 'function') {
            onTickEnd()
          }
        }
      }, 1000)
      setIntervalId(nextIntervalId)
    }
  }

  return (
    <Button onClick={handleClick}>{text}</Button>
  )
}
