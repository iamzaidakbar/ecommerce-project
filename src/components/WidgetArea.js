// WidgetArea.js
import "../styles/widget-area.scss"
import React, { useEffect, useState } from 'react';
import MultiRangeSlider from './MultiRangeSlider';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchQuery } from '../redux/Slices/searchSlice';
import { addMaxRange, addMinRange } from '../redux/Slices/filterSlice';
import { fetchAllCategories } from '../utils/getAllCategories';

const WidgetArea = () => {
  const dispatch = useDispatch();
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const allProducts = useSelector((store) => store.products.allProducts);

  const searchProduct = (e) => {
    dispatch(addSearchQuery(e.target.value));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await fetchAllCategories();
      setCategories(categoriesData);
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);

      // Handle error
    }
  };

  const countCategories = () => {
    const categoryCount = allProducts?.reduce((acc, product) => {
      if (product && product.category) {
        acc[product.category] = (acc[product.category] || 0) + 1;
      }
      return acc;
    }, {});
  
    return categoryCount || {}; // Return an empty object if categoryCount is undefined
  };
  


  return (
    <div className="widget-area">
      <span className="search-bar d-flex align-items-center gap-2">
        <input
          className="form-control rounded-0"
          onChange={searchProduct}
          placeholder="Search Products..."
        />
      </span>

      <span className="filter d-flex flex-column">
        <span className="filter-label">Filter by Price</span>
        <MultiRangeSlider
          min={0}
          max={300}
          onChange={({ min, max }) => {
            setMinVal(min);
            setMaxVal(max);
            dispatch(addMinRange(min));
            dispatch(addMaxRange(max));
          }}
        />
        <div className="filter-vals w-100 mt-5 d-flex align-items-center justify-content-between">
          <button onClick={() => {
            dispatch(addMinRange(minVal));
            dispatch(addMaxRange(maxVal));
          }} className="btn btn-sm border-0 btn-primary rounded-0 px-4">FILTER</button>
          <span className="price">
            Price: <strong>${minVal} - ${maxVal}</strong>
          </span>
        </div>
      </span>

      <span className="categories mt-3">
        <span className="category-label">Categories</span>
        <div className="category-items">
          {!isLoading && categories.length > 0 && categories?.map((category, index) => (
            <div className="lead" key={index}>
              <span>{category}</span>
              <span className='counted-categories'>({countCategories()[category]})</span>
            </div>
          ))}

        </div>
      </span>

      <span className="recently-viewed"></span>
    </div>
  );
};

export default WidgetArea;
