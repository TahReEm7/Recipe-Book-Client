import {  useContext} from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';

const Profile = () => {
    const { user } = useContext(AuthContext);


    return (
        <form className="max-w-md mx-auto my-10 p-6 bg-base-200 shadow-md rounded-xl">
             <Helmet>
        <title>Profile || BillEase</title>
      </Helmet>
             <img src={user?.photoURL} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-6" />
             <h1 className='text-semibold text-md pb-6'><strong className='text-red-300'>Name</strong> : {user?.displayName || "User"}</h1>
             <h1 className='text-semibold text-md pb-6'><strong className='text-red-300'>Email</strong> : {user?.email}</h1>
             <h1 className='text-semibold text-md pb-6'><strong className='text-red-300'>creationTime</strong> : {user?.metadata?.creationTime}</h1>
             <h1 className='text-semibold text-md pb-6'><strong className='text-red-300'>lastSignInTime</strong> : {user?.metadata?.lastSignInTime}</h1>
           
        </form>
    );
};

export default Profile;
