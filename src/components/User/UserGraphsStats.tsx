import { useEffect, useState } from 'react'
import styles from './css/UserGraphStats.module.css'
import { VictoryPie, VictoryChart, VictoryBar } from 'victory'


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserGraphsStats = ({data}: any) => {
   const [graph, setGraph] = useState([])
    const [total, setTotal] = useState(0)
    
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const graphData = data.map((item: { title: string; acessos: string }) => {
            return {
                x: item.title,
                y: Number(item.acessos)
            }
        })
        setTotal(data.map(( acessos:string ) => Number(acessos))
            .reduce((a: number, b: number) => a + b, 0))
        
        setGraph(graphData)
    },[data])
  return (
      <section className={`animeLeft ${styles.graph}`}>
          <div className={`${styles.total}${styles.graphItem}`}>
          <p>Acessos: {total}</p>
          </div>
          <div className={styles.graphItem}>
              <VictoryPie data={graph}
                  innerRadius={50}
                  padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
                  style={{
                      data: {
                          fillOpacity: .9,
                          stroke: "#fff",
                          strokeWidth:2.
                      },
                      labels: {
                          fontSize: 14,
                        fill: '#333'  
                      }
                  }}
              />
          </div>
          <div className={styles.graphItem}>
              <VictoryChart>
                  <VictoryBar alignment='start' data={graph}></VictoryBar>
              </VictoryChart>
          </div>
    </section>
  )
}

export default UserGraphsStats