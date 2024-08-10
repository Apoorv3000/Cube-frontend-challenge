import { useEffect } from 'react'
import CustomerInfo from '../../components/customer/customer-info/customer-info'
import CustomerList from '../../components/customer/customer-list/customer-list'
import './customer.css'
import { useAppDispatch } from '../../lib/redux-hooks'
import { getCustomersSuccess } from '../../store/features/customer-slice'
import { CustomersData } from '../../constants/customers'


const Customer = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCustomersSuccess(CustomersData.customers))
    }, [])

    return (
        <div className='customer-container'>
            <div className='customer-list'>
                <CustomerList />
            </div>
            <div className='customer-info'>
                <CustomerInfo />
            </div>
        </div>
    )
}

export default Customer