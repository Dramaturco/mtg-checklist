import React from 'react'
import { MTGCardBlock } from '../@types/MTGSet'
import Card from './Card'
type PageProps = {
  block: MTGCardBlock
}
function Page({ block }: PageProps) {
  return (
    <div className='border border-black flex flex-row flex-wrap justify-center border-b-0'
    >{block.cards.map((card, index) => (
      <Card card={card} key={card.id} dark={index%2===0}/>
    ))}</div>
  )
}

export default Page