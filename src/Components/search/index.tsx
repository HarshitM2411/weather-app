import "./search.scss";
import axios from 'axios';
import React, { useState } from 'react';
import SearchDropdown from "./searchbardropdown";
import { debounce } from "../../Constants/utils";
import { CITY_API_OPTIONS } from '../../Constants/api-constant';

const SearchBar = ({ onSearch }: any) => {
    const [city, setCity] = useState('');
    const [loader, setLoader] = useState(false);
    const [cityList, setCityList] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleChange = (e: any) => {
        setCity(e.target.value);
        setShowDropdown(true);
        const name = e.target.value;
        if (!name) {
            setCityList([]);
        } else {
            debounce(() => {
                getCityData(name);
            }, 1000);
        }
    };

    const getCityData = async (name: string) => {
        try {
            CITY_API_OPTIONS.params.name = name;
            setLoader(true);
            const response = await axios.request(CITY_API_OPTIONS);
            setLoader(false);
            setCityList(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const clearSearch = () => {
        setCity('');
        setCityList([]);
        setShowDropdown(false);
        onSearch('');
    }

    const handleClick = (city: string) => {
        setCity(city);
        setShowDropdown(false);
        if (city.trim()) {
            onSearch(city);
        }
    };

    return (
        <div className='container'>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={handleChange}
                    onFocus={() => { setShowDropdown(true) }}
                />
                <button onClick={clearSearch}>Clear</button>
            </div>
            {
                loader ? <p className="loader"> Fetching data from API... </p>
                    : showDropdown ?
                        <SearchDropdown cityList={cityList} handleClick={handleClick} /> : null
            }
        </div>
    );
};

export default SearchBar;
