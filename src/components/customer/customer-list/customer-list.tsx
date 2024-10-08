import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../lib/redux-hooks'
import { Customer } from '../../../lib/types'
import { fetchPhotos } from '../../../store/actions/photos-action'
import { setAtiveCustomer } from '../../../store/features/customer-slice'
import './customer-list.css'

const CustomerList = () => {
    const { customers, activeCustomer } = useAppSelector(state => state.customer)
    const [pageNumber, setPageNumber] = useState(1)
    const dispatch = useAppDispatch()

    const renderCustomerListCard = (customer: Customer) => {


        const handleSelectCustomer = (customer: Customer) => {
            dispatch(setAtiveCustomer(customer))
            setPageNumber(prev => prev + 1)
            dispatch(fetchPhotos(pageNumber + 1))
        }

        return (
            <div key={customer.id}
                className={activeCustomer?.id === customer.id ? "customer-list-card active" : "customer-list-card"}
                onClick={() => handleSelectCustomer(customer)}
            >
                <div className="customer-list-card-header">{customer.title}
                    &nbsp;
                    {customer.name}
                </div>


            </div>
        )
    }

    const renderCustomerList = () => {
        if (customers.length === 0) {
            return <div>No customers found</div>
        }
        else if (customers.length > 0) {
            return customers.map((customer: Customer) => renderCustomerListCard(customer))
        }
    }

    return (
        <div className="container-list-container">
            <div className="customer-list-header">Customer List</div>
            <div className="customer-list-body">
                {renderCustomerList()}
            </div>
        </div>
    )
}

export default CustomerList