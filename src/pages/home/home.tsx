import Navbar from '../../components/navbar/navbar'
import Customer from '../customer/customer'

import './home.css'

const Home = () => {
    return (
        <main className='home-container'>
            <Navbar />
            <div>
                <Customer />
            </div>
        </main>
    )
}

export default Home