import React from 'react'
import LineCharts from '../../components/LineChart/LineCharts'
import useGetWeeklyStats from '../../hooks/analytics/useGetWeeklyStats'
import useAnalyticsStore from '../../store/useAnalyticsStore'
import { useParams } from 'react-router-dom'

const Stats = () => {
    const {blogID} = useParams();
   const{isWeeklyLoading} = useGetWeeklyStats(blogID);
   const {likeWeekly, viewWeekly, commentsWeekly} = useAnalyticsStore();

  return (
    <div>
        <LineCharts data={likeWeekly} xAxis="date" yAxis="likes"/>
        <LineCharts data={viewWeekly} xAxis="date" yAxis="views"/>
        <LineCharts data={commentsWeekly} xAxis="date" yAxis="comments"/>
    </div>
  )
}

export default Stats