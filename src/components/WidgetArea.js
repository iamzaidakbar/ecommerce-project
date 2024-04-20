import React, { useState } from 'react'
import { CiLocationArrow1 } from "react-icons/ci";
import MultiRangeSlider from './MultiRangeSlider';


const WidgetArea = () => {

  const [minVal, setMinVal] = useState(0)
  const [maxVal, setMaxVal] = useState(0)


  return (
    <div className='widget-area'>


      <span className='search-bar d-flex align-items-center gap-2'>
        <input className='form-control rounded-0' placeholder='Search Products...' />
        <button className='btn btn-primary rounded-0 border-0'> <CiLocationArrow1 size={'24px'} color='white' /> </button>
      </span>


      <span className='filter d-flex flex-column'>
        <span className='filter-label'>Filter by Price</span>
        <MultiRangeSlider
          min={0}
          max={300}
          onChange={({ min, max }) => {
            setMinVal(min)
            setMaxVal(max)
          }}
        />
        <div className='filter-vals w-100 mt-4 d-flex align-items-center justify-content-between'>
          <button className='btn btn-sm border-0 btn-primary rounded-0 px-4'>FILTER</button>
          <span className='price'>
            Price: <strong>${minVal} - ${maxVal}</strong>
          </span>
        </div>
      </span>


      <span className='categories mt-3'>
        <span className='category-label'>Categories</span>

      </span>


      <span className='recently-viewed'></span>
    </div>
  )
}

export default WidgetArea