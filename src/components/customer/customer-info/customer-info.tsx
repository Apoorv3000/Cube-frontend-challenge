import { useAppSelector } from "../../../lib/redux-hooks"


const CustomerInfo = () => {

    const { activeCustomer, photos, photosError, photosLoading } = useAppSelector(state => state.customer)



    const renderCustomerInfoCard = () => {
        return (
            <div>
                <div className="customer-info-card">
                    <div className="customer-info-card-header">Name</div>
                    <div className="customer-info-card-body">{activeCustomer?.title} {activeCustomer?.name}</div>
                </div>
                <div className="customer-info-card">
                    <div className="customer-info-card-header">Address</div>
                    <div className="customer-info-card-body">
                        {activeCustomer?.address.street}
                        <br />
                        {activeCustomer?.address.city}, {activeCustomer?.address.state} {activeCustomer?.address.postalCode}
                        <br />
                        {activeCustomer?.address.country}
                    </div>
                </div>
            </div>)
    }

    const renderCustomerInfo = () => {
        if (!activeCustomer) {
            return <div>No customer selected</div>
        }
        else if (activeCustomer) {
            return (
                <div>
                    <div className="customer-info-header">Customer Info</div>
                    <div className="customer-info-body">
                        {renderCustomerInfoCard()}
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="customer-info-container">
            {
                renderCustomerInfo()
            }
        </div>
    )
}

export default CustomerInfo