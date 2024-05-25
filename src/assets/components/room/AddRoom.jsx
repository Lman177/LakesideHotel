import React, { useState } from "react"
import { addRoom } from "../utils/ApiFunctions"
import RoomTypeSelector from "../common/RoomTypeSelector"
import RoomLocationSelector from "../common/RoomLocationSelector"
import { Link } from "react-router-dom"

const AddRoom = () => {
	const [newRoom, setNewRoom] = useState({
		roomTypeName: "",
		description:"",
		roomAddress:"",
		roomLocation:"",
		photo: null,
		roomPrice: ""
	})

	const [selectedRoomType, setSelectedRoomType] = useState("")
	const [selectedLocation, setSelectedLocation] = useState("")

	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const [imagePreview, setImagePreview] = useState("")

	const handleRoomInputChange = (e) => {
		const name = e.target.name
		let value = e.target.value
		if (name === "roomPrice") {
			if (!isNaN(value)) {
				value = parseInt(value)
			} else {
				value = ""
			}
		}
		setNewRoom({ ...newRoom, [name]: value })
	}

	const handleImageChange = (e) => {
		if (e.target.files.length > 0) {
			const selectedImage = e.target.files[0]
			setNewRoom({ ...newRoom, photo: selectedImage })
			setImagePreview(URL.createObjectURL(selectedImage))
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const success = await addRoom(newRoom.photo, newRoom.roomTypeName, newRoom.roomPrice, newRoom.description, newRoom.roomAddress, newRoom.roomLocation)
			if (success !== undefined) {
				setSuccessMessage("A new room was added successfully!")
				setNewRoom({ photo: null, roomTypeName: "", roomPrice: "", description:"", roomAddress:"", roomLocation:"" })
				setImagePreview("")
				setErrorMessage("")
			} else {
				setErrorMessage("Error adding new room")
			}
		} catch (error) {
			setErrorMessage(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
	}

	return (
		<section className="container mt-5 mb-5">
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					<h2 className="mt-5 mb-2">Add a New Room</h2>
					{successMessage && (
						<div className="alert alert-success fade show"> {successMessage}</div>
					)}

					{errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

					<form onSubmit={handleSubmit}>
						<div className="mb-3">
							<label htmlFor="roomTypeName" className="form-label">
								What type of place will guests have?
							</label>
							<div>
								<RoomTypeSelector
									handleRoomInputChange={handleRoomInputChange}
									selectedRoomType={selectedRoomType}
									setSelectedRoomType={setSelectedRoomType}
								/>
							</div>
						</div>
						<div className="mb-3">
							<label htmlFor="roomAddress" className="form-label">
								Number and Lane of your Place?
							</label>
							<input
								required
								type="text"
								className="form-control"
								id="roomAddress"
								name="roomAddress"
								value={newRoom.roomAddress}
								onChange={handleRoomInputChange}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="roomLocation" className="form-label">
								Where's your place located?</label>
							<div>
								<RoomLocationSelector
									handleRoomInputChange={handleRoomInputChange}
									selectedLocation={selectedLocation}
									setSelectedLocation={setSelectedLocation}
								/>
							</div>
						</div>
						<div className="mb-3">
							<label htmlFor="photo" className="form-label">
								Room Photo
							</label>
							<input
								required
								name="photo"
								id="photo"
								type="file"
								className="form-control"
								onChange={handleImageChange}
							/>
							{imagePreview && (
								<img
									src={imagePreview}
									alt="Preview room photo"
									style={{ maxWidth: "400px", maxHeight: "400px" }}
									className="mb-3"
								/>
							)}
						</div>
						<div className="mb-3">
							<label htmlFor="description" className="form-label">
								Room Description
							</label>
							<input
								required
								type="text"
								className="form-control"
								id="description"
								name="description"
								value={newRoom.description}
								onChange={handleRoomInputChange}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="roomPrice" className="form-label">
								Room Price
							</label>
							<input
								required
								type="number"
								className="form-control"
								id="roomPrice"
								name="roomPrice"
								value={newRoom.roomPrice}
								onChange={handleRoomInputChange}
							/>
						</div>
						<div className="d-grid gap-2 d-md-flex mt-2">
							<Link to={"/admin-rooms"} className="btn btn-outline-info">
								Existing rooms
							</Link>
							<button type="submit" className="btn btn-outline-primary ml-5">
								Save Room
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}

export default AddRoom
