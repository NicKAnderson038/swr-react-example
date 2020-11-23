import React from 'react'
import { SWRConfig } from 'swr'
import { isUndefined } from 'lodash'
import { useRequest } from './services/useRequest'

import './styles.css'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function App() {
  return (
    <SWRConfig value={{ revalidateOnFocus: false, fetcher }}>
      <Crimes />
    </SWRConfig>
  )
}

function Crimes() {
  const query = '?lat=52.629729&lng=-1.131592&date=2019-10'
  const { data } = useRequest(query)

  return (
    !isUndefined(data) && (
      <DisplayCrimes
        crimes={data}
        categories={[...new Set(data.map((crime) => crime.category))]}
      />
    )
  )
}

function DisplayCrimes({ crimes, categories }) {
  const [filterCategory, setFilterCategory] = React.useState(null)
  const filteredCrimes = filterCategory
    ? crimes.filter((crime) => crime.category === filterCategory)
    : crimes
  return (
    <>
      {categories.map((category) => (
        <button key={category} onClick={() => setFilterCategory(category)}>
          {category}
        </button>
      ))}
      {filterCategory && (
        <button onClick={() => setFilterCategory(null)}>reset</button>
      )}
      <pre>{JSON.stringify(filteredCrimes, null, 2)}</pre>;
    </>
  )
}
