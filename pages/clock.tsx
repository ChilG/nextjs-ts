import React, { useEffect, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import moment from 'moment'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const momentInit = moment()
  const hourDegInit = (momentInit.hours() / 24) * 360
  const minuteDegInit = (momentInit.minute() / 60) * 360
  const secondDegInit = (momentInit.second() / 60) * 360
  const timeInit = momentInit.format('HH:mm:ss')

  return {
    props: {
      hourDegInit,
      minuteDegInit,
      secondDegInit,
      timeInit,
    },
  }
}

export default function Clock(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { hourDegInit, minuteDegInit, secondDegInit, timeInit } = props

  const [time, setTime] = useState<string>(timeInit)
  const [hourDegree, setHourDegree] = useState<number>(hourDegInit)
  const [minuteDegree, setMinuteDegree] = useState<number>(minuteDegInit)
  const [secondDegree, setSecondDegree] = useState<number>(secondDegInit)

  useEffect(() => {
    const interval = setInterval(() => {
      const time = moment()
      const hours = time.hours()
      const minute = time.minute()
      const second = time.second()
      const hourDeg = ((hours / 24) * 360).toString()
      const minuteDeg = ((minute / 60) * 360).toString()
      const secondDeg = ((second / 60) * 360).toString()
      setHourDegree(parseInt(hourDeg))
      setMinuteDegree(parseInt(minuteDeg))
      setSecondDegree(parseInt(secondDeg))
      setTime(time.format('HH:mm:ss'))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-60 h-60 rounded-full border border-cyan-500 relative">
        <div
          id="hour"
          className={`w-1 h-12 bg-cyan-500 absolute left-2/4 bottom-2/4 origin-bottom -translate-x-2/4 rounded-lg`}
          style={{ transform: `rotate(${hourDegree}deg)` }}
        />
        <div
          id="minute"
          className={`w-1 h-20 bg-cyan-400 absolute left-2/4 bottom-2/4 origin-bottom -translate-x-2/4 rounded-lg`}
          style={{ transform: `rotate(${minuteDegree}deg)` }}
        />
        <div
          id="second"
          className={`w-0.5 h-24 bg-cyan-300 absolute left-2/4 bottom-2/4 origin-bottom -translate-x-2/4 rounded-lg`}
          style={{ transform: `rotate(${secondDegree}deg)` }}
        />
        <div className="w-1 h-2 bg-cyan-500/75 absolute left-2/4 rounded-b-lg"/>
        <div className="w-2 h-1 bg-cyan-500/75 absolute right-0 bottom-2/4 rounded-l-lg"/>
        <div className="w-1 h-2 bg-cyan-500/75 absolute left-2/4 bottom-0 rounded-t-lg"/>
        <div className="w-2 h-1 bg-cyan-500/75 absolute bottom-2/4 rounded-r-lg"/>
      </div>
      <div className="mt-8 font-inconsolata text-2xl text-cyan-500">{time}</div>
    </div>
  )
}
