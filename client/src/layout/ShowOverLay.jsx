import React, { useRef, useState } from 'react'
import ReactFlagsSelect from "react-flags-select";
import { countryNames } from '../data/countryNames';
import { locationData } from '../data/provincewithcities';

const ShowOverLay = ({toggleOverlay , selectedCountry , selectedProvince , selectedCity , handleSelectCountry , handleSelectProvince , handleSelectCity}) => {
  return (
    <div className="animation fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-5 border-gray-400 border-2 rounded-lg shadow-lg relative w-full max-w-md mx-4 transform transition-transform duration-500 ease-in-out scale-100">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-xl">
          Choose your delivery location
        </p>
        <button className="animation text-black" onClick={toggleOverlay}>
          ✕
        </button>
      </div>

      <p className="mt-4 text-sm">
        Delivery options and delivery speeds may vary for different
        locations.
      </p>
      <div className="flex items-center mt-7 justify-between">
        <div className="mr-3 h-0.5 w-full bg-indigo-700">
          <hr />
        </div>
        <div className="min-w-28">
          <p className="text-[9px] font-medium">or enter city/area</p>
        </div>
        <div className="h-0.5 w-full bg-indigo-700">
          <hr />
        </div>
      </div>

      {selectedCountry && (
        <div className="flex w-full gap-4 mt-4 text-xs">
          <div className="w-1/2">
            <select
              className="w-full px-4 py-2 border-x-2 shadow-md rounded-md"
              value={selectedProvince}
              onChange={handleSelectProvince}
            >
              <option value="">Select area</option>
              {Object.keys(
                locationData[selectedCountry]?.provinces || {}
              ).map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <select
              className="w-full px-4 py-2 border-x-2 shadow-md rounded-md"
              value={selectedCity}
              onChange={handleSelectCity}
              disabled={!selectedProvince}
            >
              <option value="">Select City</option>
              {(
                locationData[selectedCountry]?.provinces[
                  selectedProvince
                ] || []
              ).map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <h2 className="text-center mb-2 font-semibold text-md mt-9 text-sm">
        Change Country Address
      </h2>
      <ReactFlagsSelect
        selected={selectedCountry}
        onSelect={handleSelectCountry}
        countries={Object.keys(countryNames)}
        searchable
        className=""
        showSelectedLabel
        showOptionLabel
        selectedSize={11}
        optionsSize={10}
      />
    </div>
  </div>
  )
}

export default ShowOverLay