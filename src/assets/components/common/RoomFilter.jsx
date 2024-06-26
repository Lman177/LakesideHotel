import React, { useEffect, useState } from "react"

const RoomFilter = ({ data, setFilteredData }) => {
	const [filter, setFilter] = useState("")

	const handleSelectChange = (e) => {
		const selectedType = e.target.value
		setFilter(selectedType)

		const filteredRooms = Array.isArray(data) ? data.filter((room) => room
			.roomTypeName.name
			.toLowerCase()
			.includes(selectedType.toLowerCase())
		) : [];
		setFilteredData(filteredRooms)
	}

	useEffect(() => {
		setFilteredData(data);
	  }, [data]);

	const clearFilter = () => {
		setFilter("")
		setFilteredData(data)
	}

	const roomTypes = ["", ...new Set(data.map((room) => room.roomTypeName.name))]
	// console.log(roomTypes)

	return (
		<div className="input-group mb-3">
			<span className="input-group-text" id="room-type-filter">
				Filter rooms by type
			</span>
			<select
				className="form-select"
				aria-label="romm type filter"
				value={filter}
				onChange={handleSelectChange}>
				<option value="">select a room type to filter....</option>
				{roomTypes.map((type, index) => (
					<option key={index} value={String(type)}>
						{String(type)}
					</option>
				))}
			</select>
			<button className="btn btn-hotel" type="button" onClick={clearFilter}>
				Clear Filter
			</button>
		</div>
	)
}
export default RoomFilter