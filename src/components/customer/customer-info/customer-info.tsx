import { useEffect, useState } from "react"
import { useAppSelector } from "../../../lib/redux-hooks"
import './customer-info.css'

const CustomerInfo = () => {
    const { activeCustomer, photos, photosError, photosLoading } = useAppSelector(state => state.customer)

    const [currentPhotoList, setCurrentPhotoList] = useState<any[]>([])
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0)

    useEffect(() => {
        if (photos?.length > 0) {
            // Immediately set the first batch of photos
            if (currentPhotoIndex === 0 && !currentPhotoList.length) {
                setCurrentPhotoList(photos.slice(0, 10));
            }


            // Set up the interval to change photos every 10 seconds
            const intervalId = setInterval(() => {
                const newIndex = currentPhotoIndex + 10 >= photos.length ? 0 : currentPhotoIndex + 10;
                setCurrentPhotoList(photos.slice(newIndex, newIndex + 10))
                setCurrentPhotoIndex((prevIndex) =>
                    prevIndex + 10 >= photos.length ? 0 : prevIndex + 10
                );
            }, 10000);

            return () => clearInterval(intervalId); // Cleanup interval on component unmount or dependency change
        }
    }, [photos, currentPhotoIndex]);


    useEffect(() => {
        if (photos?.length > 0) {
            // Increase the index to get the next set of photos when the active customer changes
            const newPhotoIndex = currentPhotoIndex + 10 >= photos.length ? 0 : currentPhotoIndex + 10;

            setCurrentPhotoList(photos.slice(newPhotoIndex, newPhotoIndex + 10));
            setCurrentPhotoIndex(newPhotoIndex);
        }
    }, [activeCustomer]);



    const renderCustomerInfoCard = () => {
        return (
            <div className="customer-info-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <img src={currentPhotoList[0]?.urls?.small} alt="customer" style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '20%',
                            objectFit: 'cover'
                        }} />
                    </div>
                    <div style={{ width: '60%' }}>
                        <div>
                            <div className="customer-info-card-header">Name</div>
                            <div className="customer-info-card-body">{activeCustomer?.title} {activeCustomer?.name}</div>
                        </div>
                        <div style={{ marginTop: "2rem" }}>
                            <div className="customer-info-card-header">Address</div>
                            <div className="customer-info-card-body">
                                {activeCustomer?.address.street}
                                <br />
                                {activeCustomer?.address.city}, {activeCustomer?.address.state} {activeCustomer?.address.postalCode}
                                <br />
                                {activeCustomer?.address.country}
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }

    const renderPhotosGrid = () => {
        if (photosLoading) {
            return <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", marginTop: '14rem' }}>Loading...</div>
        }
        else if (photosError) {
            return <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", marginTop: '14rem' }}>{photosError}</div>
        }
        else if (currentPhotoList?.length > 0) {
            return (
                <div className="photos-container">
                    <div className="photos-grid">
                        {currentPhotoList?.slice(1).map((photo: any) => {
                            return (
                                <div key={photo.id} className="photos-grid-card">
                                    <img src={photo?.urls?.small} alt="customer" style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '20%',
                                        objectFit: 'cover'
                                    }} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }
    }

    const renderCustomerInfo = () => {
        if (!activeCustomer) {
            return <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", marginTop: '14rem' }}>No customer selected</div>
        }
        else if (photosLoading) {
            return <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", marginTop: '14rem' }}>Loading...</div>
        }
        else if (activeCustomer) {
            return (
                <div>
                    <div className="customer-info-body">
                        <div style={{ maxHeight: '38rem', overflowY: 'auto' }}>
                            {currentPhotoList && renderCustomerInfoCard()}
                            {renderPhotosGrid()}
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="customer-info-container">
            <div style={{ fontSize: '1.5rem', fontWeight: '600', textAlign: 'center', borderBottom: '1px solid #e1e1e1' }}>
                {activeCustomer?.name ? `${activeCustomer?.name} details here` : "Please select a cutomer"}

            </div>
            {renderCustomerInfo()}
        </div>
    )
}

export default CustomerInfo
