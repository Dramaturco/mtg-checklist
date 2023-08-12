import React from 'react'
import { MTGCardBlock } from '../@types/MTGSet'
import Card from './Card'
type PageProps = {
  block: MTGCardBlock
}
function Page({ block }: PageProps) {
  return (
    <div className='border-2 border-black flex flex-row flex-wrap justify-center'
    >{block.cards.map((card, index) => (
      <Card name={card.name} key={card.id} colorType={card.colorType} dark={index%2===0}/>
    ))}</div>
  )
}

export default Page