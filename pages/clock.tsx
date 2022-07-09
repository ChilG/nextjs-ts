import React, { useEffect, useState } from 'react'
import moment from 'moment'

const Index: React.FC = () => {
  const [time, setTime] = useState<string>('00:00:00')
  const [hourDegree, setHourDegree] = useState<number>(0)
  const [minuteDegree, setMinuteDegree] = useState<number>(0)
  const [secondDegree, setSecondDegree] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const time = moment()
      const hours = time.hours()
      const minute = time.minute()
      const second = time.second()
      console.log({
        hours,
        minute,
        second,
      })
      setTime(time.format('HH:mm:ss'))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-60 h-60 rounded-full shadow-lg shadow-cyan-500/50 relative">
        <div
          id="hour"
          className={`w-0.5 h-12 bg-cyan-500 absolute left-2/4 bottom-2/4 origin-bottom rotate-${hourDegree}`}
        />
        <div
          id="minute"
          className={`w-0.5 h-24 bg-red-500 absolute left-2/4 bottom-2/4 origin-bottom rotate-${minuteDegree}`}
        />
        <div
          id="second"
          className={`w-0.5 h-28 bg-yellow-500/75 absolute left-2/4 bottom-2/4 origin-bottom rotate-${secondDegree}`}
        />
      </div>
      <div className="mt-8 font-inconsolata text-2xl text-cyan-500">{time}</div>
    </div>
  )
}

export default Index
